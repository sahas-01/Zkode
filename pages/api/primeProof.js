// pages/api/primeProof.js

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'});
        return;
    }
    const { number } = req.query;
    const inputNumber = parseInt(number);
  
    console.log(`Checking if ${inputNumber} is a prime number.`);
  
    const isPrime = isNumberPrime(inputNumber);

    res.status(200).json({
      number: inputNumber,
      isPrime: isPrime,
    });
  }
  
  function isNumberPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
  
    if (n % 2 === 0 || n % 3 === 0) return false;
  
    for (let i = 5; i * i <= n; i = i + 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
  
    return true;
  }
  