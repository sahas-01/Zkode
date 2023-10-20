import * as vscode from "vscode";
import {
	SpheronClient,
	ProtocolEnum,
	ProviderEnum,
	FrameworkEnum,
	NodeVersionEnum,
} from "@spheron/site";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI4MGM0YTYxYWYwMWI3NzBkMDAyN2I3MDUxMDdjZDg1NWMzYTVhMmJmMjE4ZTE4NTAwMmE2YjEyNmUwN2Y0MTA3NjhjYzMxNWMxODE2YjM2NDg3NzZmZWJjOGIxNDI2MTQ4OTE1MzcwMTY1YmI1OWYyNGY1ZTVlNWZiZGFhNmQ0ZiIsImlhdCI6MTY5Nzc4NTQ4OCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.mKYo8La_Ui4K9KI5Opvn0biTR-kLcuMjFJEcVmI9vNI";

const spheronClient = new SpheronClient({ token });

console.log(spheronClient);

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand("sphede", async () => {
		// const projectName = await vscode.window.showInputBox({
		// 	prompt: "Enter the project name",
		// 	placeHolder: "MyProject",
		// });

		// if (!projectName) {
		// 	vscode.window.showErrorMessage("Project name is required.");
		// 	return;
		// }

		// const githubUrl = await vscode.window.showInputBox({
		// 	prompt: "Enter the GitHub URL",
		// 	placeHolder: "https://github.com/SwarupKharul/Tic-Tac-Toe",
		// });

		// if (!githubUrl) {
		// 	vscode.window.showErrorMessage("GitHub URL is required.");
		// 	return;
		// }

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
						gitUrl: "https://github.com/SwarupKharul/Tic-Tac-Toe",
						projectName: "test",
						environmentVariables: {
							key1: "value1",
						},
						provider: ProviderEnum.GITHUB,
						branch: "main",
						protocol: ProtocolEnum.FILECOIN,
						configuration: {
							framework: FrameworkEnum.REACT,
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

					let deployementUrl = await spheronClient.deployments.get(
						"653227431a79370012cf7cdb"
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
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
