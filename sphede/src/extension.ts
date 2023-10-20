import * as vscode from "vscode";
import {
	SpheronClient,
	ProtocolEnum,
	ProviderEnum,
	FrameworkEnum,
	NodeVersionEnum,
	DeploymentStatusEnum,
	Deployment,
} from "@spheron/site";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI4MGM0YTYxYWYwMWI3NzBkMDAyN2I3MDUxMDdjZDg1NWMzYTVhMmJmMjE4ZTE4NTAwMmE2YjEyNmUwN2Y0MTA3NjhjYzMxNWMxODE2YjM2NDg3NzZmZWJjOGIxNDI2MTQ4OTE1MzcwMTY1YmI1OWYyNGY1ZTVlNWZiZGFhNmQ0ZiIsImlhdCI6MTY5Nzc4NTQ4OCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.mKYo8La_Ui4K9KI5Opvn0biTR-kLcuMjFJEcVmI9vNI";

const spheronClient = new SpheronClient({ token });

const getDeploymentUrl = async (deploymentId: string) => {
	return await spheronClient.deployments.get(deploymentId);
};

const frameworkMapping = {
	SIMPLE_JAVASCRIPT_APP: FrameworkEnum.SIMPLE_JAVASCRIPT_APP,
	VUE: FrameworkEnum.VUE,
	REACT: FrameworkEnum.REACT,
	NEXT: FrameworkEnum.NEXT,
	ANGULAR: FrameworkEnum.ANGULAR,
	PREACT: FrameworkEnum.PREACT,
	NUXT: FrameworkEnum.NUXT,
	SVELTE: FrameworkEnum.SVELTE,
	GATSBY: FrameworkEnum.GATSBY,
	ELEVENTY: FrameworkEnum.ELEVENTY,
	DOCUSAURUS: FrameworkEnum.DOCUSAURUS,
	SANITY: FrameworkEnum.SANITY,
	HUGO: FrameworkEnum.HUGO,
	IONIC_REACT: FrameworkEnum.IONIC_REACT,
	VITE: FrameworkEnum.VITE,
	SCULLY: FrameworkEnum.SCULLY,
	STENCIL: FrameworkEnum.STENCIL,
	BRUNCH: FrameworkEnum.BRUNCH,
	IONIC_ANGULAR: FrameworkEnum.IONIC_ANGULAR,
};

console.log(spheronClient);

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"sphede.deploy",
		async () => {
			const projectName = await vscode.window.showInputBox({
				prompt: "Enter the project name",
				placeHolder: "MyProject",
			});

			if (!projectName) {
				vscode.window.showErrorMessage("Project name is required.");
				return;
			}

			const githubUrl = await vscode.window.showInputBox({
				prompt: "Enter the GitHub URL",
				placeHolder: "https://github.com/user/repo",
			});

			if (!githubUrl) {
				vscode.window.showErrorMessage("GitHub URL is required.");
				return;
			}

			const frameworkChoice = await vscode.window.showQuickPick(
				Object.keys(frameworkMapping),
				{
					placeHolder: "Select a framework for your project",
				}
			);
			if (!frameworkChoice) {
				vscode.window.showErrorMessage("Framework is required.");
				return;
			}

			// Create a progress loader while deploying
			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: "Deploying project...",
					cancellable: true,
				},
				async (progress, t) => {
					t.onCancellationRequested(() => {
						// Handle cancellation
						vscode.window.showErrorMessage("Deployment canceled.");
					});

					try {
						let response = await spheronClient.deployments.deploy({
							gitUrl: githubUrl,
							projectName,
							environmentVariables: {
								key1: "value1",
							},
							provider: ProviderEnum.GITHUB,
							branch: "master",
							protocol: ProtocolEnum.FILECOIN,
							configuration: {
								framework:
									frameworkMapping[
										frameworkChoice as keyof typeof frameworkMapping
									],
								workspace: "",
								installCommand: "yarn install",
								buildCommand: "yarn build",
								publishDir: "build",
								nodeVersion: NodeVersionEnum.V_16,
							},

							gitProviderPreferences: {
								prComments: false,
								commitComments: false,
								buildStatus: false,
								githubDeployment: true,
							},
						});

						await context.workspaceState.update(
							"projectId",
							response.projectId
						);

						let deployementUrl = await spheronClient.deployments.get(
							response.deploymentId
						);

						console.log(deployementUrl);
						vscode.window.showInformationMessage("Deployment successful.");
					} catch (error) {
						vscode.window.showErrorMessage(
							`Deployment failed: ${error as Error}`
						);
					}
				}
			);
		}
	);

	const getDeploymentsCommand = vscode.commands.registerCommand(
		"sphede.getDeployments",
		async () => {
			const projectId = context.workspaceState.get<string>("projectId");

			if (!projectId) {
				vscode.window.showErrorMessage("Project Not yet deployed.");
				return;
			}
			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: "Fetching deployments...",
					cancellable: true,
				},
				async (progress, token) => {
					token.onCancellationRequested(() => {
						vscode.window.showInformationMessage(
							"Fetching deployments canceled."
						);
					});

					try {
						const deployments: Deployment[] =
							await spheronClient.projects.getDeployments(projectId, {
								skip: 0,
								limit: 5,
							});

						if (deployments.length === 0) {
							vscode.window.showInformationMessage("No deployments found.");
						} else {
							const deploymentInfo = [];
							for (let index = 0; index < deployments.length; index++) {
								const deployment = deployments[index];

								if (deployment.status === DeploymentStatusEnum.DEPLOYED) {
									let url = await getDeploymentUrl(deployment.id);
									deploymentInfo.push({
										deployment,
										deployedUrl: url.sitePreview,
									});
								} else {
									deploymentInfo.push({
										deployment,
									});
								}
							}

							// Display deployments as an information message
							deploymentInfo.forEach(async (deployment, index) => {
								if (
									deployment.deployment.status === DeploymentStatusEnum.DEPLOYED
								) {
									// show Open Link button
									const openLinkItem: vscode.MessageItem = {
										title: "Open Link",
									};

									const choice = await vscode.window.showInformationMessage(
										`${index + 1}: ` +
											`Deployment ID: ${deployment.deployment.id}, URL: ${deployment.deployedUrl}`,
										openLinkItem
									);

									if (choice === openLinkItem) {
										// Handle opening the URL here, e.g., open in a web browser.
										if (deployment.deployedUrl) {
											vscode.env.openExternal(
												vscode.Uri.parse(deployment.deployedUrl)
											);
										}
									}
								} else {
									// show only deployment id
									vscode.window.showInformationMessage(
										`${index + 1}: ` +
											`Deployment ID: ${deployment.deployment.id}`
									);
								}
							});
						}
					} catch (error) {
						vscode.window.showErrorMessage(
							`Error fetching deployments: ${(error as Error).message}`
						);
					}
				}
			);
		}
	);

	context.subscriptions.push(getDeploymentsCommand);
	context.subscriptions.push(disposable);
}

export function deactivate() {}
