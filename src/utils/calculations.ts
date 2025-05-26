import * as math from 'mathjs';
import { CalculationStep } from '../types';

// Function to perform basic calculations
export const calculate = (expression: string): string => {
  try {
    const result = math.evaluate(expression);
    return math.format(result, { precision: 14 });
  } catch (error) {
    console.error('Calculation error:', error);
    return 'Error';
  }
};

// Function to solve linear equations (ax + b = c)
export const solveLinearEquation = (equation: string): { result: string; steps: CalculationStep[] } => {
  try {
    const steps: CalculationStep[] = [];
    
    // Add the original equation as the first step
    steps.push({
      expression: equation,
      result: '',
      explanation: 'Original equation'
    });

    // Check if equation contains '='
    if (!equation.includes('=')) {
      equation = `${equation} = 0`;
      steps.push({
        expression: equation,
        result: '',
        explanation: 'Rearranged to standard form'
      });
    }

    const solution = math.solve(equation, 'x');
    
    // Add solution step
    steps.push({
      expression: 'x = ' + math.format(solution, { precision: 10 }),
      result: math.format(solution, { precision: 10 }),
      explanation: 'Final solution'
    });
    
    return {
      result: `x = ${math.format(solution, { precision: 10 })}`,
      steps
    };
  } catch (error) {
    console.error('Equation solving error:', error);
    return {
      result: 'Error solving equation',
      steps: [{
        expression: equation,
        result: 'Error',
        explanation: 'Could not solve the equation'
      }]
    };
  }
};

// Function to solve quadratic equations (ax² + bx + c = 0)
export const solveQuadraticEquation = (equation: string): { result: string; steps: CalculationStep[] } => {
  try {
    const steps: CalculationStep[] = [];
    
    // Add the original equation as the first step
    steps.push({
      expression: equation,
      result: '',
      explanation: 'Original equation'
    });

    // Check if equation contains '='
    if (!equation.includes('=')) {
      equation = `${equation} = 0`;
      steps.push({
        expression: equation,
        result: '',
        explanation: 'Rearranged to standard form'
      });
    }

    // Parse the equation to extract coefficients a, b, c
    // This is a simplified approach and might need refinement for complex equations
    const cleanedEquation = equation.replace(/\s/g, '');
    const sides = cleanedEquation.split('=');
    const leftSide = sides[0];
    const rightSide = sides[1] || '0';
    
    // Move everything to the left side
    const rearrangedEquation = `${leftSide}-(${rightSide})`;
    const polynomialForm = math.simplify(rearrangedEquation).toString();
    
    steps.push({
      expression: polynomialForm + ' = 0',
      result: '',
      explanation: 'Simplified to standard form ax² + bx + c = 0'
    });
    
    // Extract coefficients from the polynomial
    const polynomial = math.parse(polynomialForm);
    const coefficients = math.polynomialCoefficients(polynomial, 'x').reverse();
    
    // Ensure we have 3 coefficients (a, b, c)
    while (coefficients.length < 3) {
      coefficients.push(0);
    }
    
    const a = coefficients[0];
    const b = coefficients[1];
    const c = coefficients[2];
    
    steps.push({
      expression: `a = ${a}, b = ${b}, c = ${c}`,
      result: '',
      explanation: 'Identified coefficients'
    });
    
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c;
    
    steps.push({
      expression: `Discriminant = b² - 4ac = ${b}² - 4 × ${a} × ${c} = ${discriminant}`,
      result: discriminant.toString(),
      explanation: 'Calculate the discriminant to determine the number of solutions'
    });
    
    let result = '';
    
    if (discriminant > 0) {
      // Two real solutions
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      
      steps.push({
        expression: `x₁ = (-b + √discriminant) / (2a) = (-${b} + √${discriminant}) / (2 × ${a})`,
        result: x1.toString(),
        explanation: 'First solution using the quadratic formula'
      });
      
      steps.push({
        expression: `x₂ = (-b - √discriminant) / (2a) = (-${b} - √${discriminant}) / (2 × ${a})`,
        result: x2.toString(),
        explanation: 'Second solution using the quadratic formula'
      });
      
      result = `x₁ = ${math.format(x1, { precision: 10 })}, x₂ = ${math.format(x2, { precision: 10 })}`;
    } else if (discriminant === 0) {
      // One real solution (repeated)
      const x = -b / (2 * a);
      
      steps.push({
        expression: `x = -b / (2a) = -${b} / (2 × ${a})`,
        result: x.toString(),
        explanation: 'Single (repeated) solution when discriminant is zero'
      });
      
      result = `x = ${math.format(x, { precision: 10 })}`;
    } else {
      // Complex solutions
      const realPart = -b / (2 * a);
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
      
      steps.push({
        expression: `Real part = -b / (2a) = -${b} / (2 × ${a})`,
        result: realPart.toString(),
        explanation: 'Real part of complex solutions'
      });
      
      steps.push({
        expression: `Imaginary part = √|discriminant| / (2a) = √|${discriminant}| / (2 × ${a})`,
        result: imaginaryPart.toString(),
        explanation: 'Imaginary part of complex solutions'
      });
      
      result = `x₁ = ${math.format(realPart, { precision: 10 })} + ${math.format(imaginaryPart, { precision: 10 })}i, x₂ = ${math.format(realPart, { precision: 10 })} - ${math.format(imaginaryPart, { precision: 10 })}i`;
    }
    
    steps.push({
      expression: result,
      result,
      explanation: 'Final solution(s)'
    });
    
    return {
      result,
      steps
    };
  } catch (error) {
    console.error('Quadratic equation solving error:', error);
    return {
      result: 'Error solving equation',
      steps: [{
        expression: equation,
        result: 'Error',
        explanation: 'Could not solve the equation'
      }]
    };
  }
};

// Function to convert units
export const convertUnit = (value: number, fromUnit: string, toUnit: string): number => {
  try {
    const result = math.unit(value, fromUnit).toNumber(toUnit);
    return result;
  } catch (error) {
    console.error('Unit conversion error:', error);
    throw new Error('Invalid unit conversion');
  }
};

// Function to parse natural language input
export const parseNaturalLanguage = (input: string): string => {
  // Remove question marks and other punctuation
  input = input.replace(/[?!.]/g, '').toLowerCase();
  
  // Replace common words and phrases
  input = input
    .replace(/what is/g, '')
    .replace(/calculate/g, '')
    .replace(/solve/g, '')
    .replace(/the square root of/g, 'sqrt(')
    .replace(/square root of/g, 'sqrt(')
    .replace(/sqrt of/g, 'sqrt(')
    .replace(/the cube root of/g, 'cbrt(')
    .replace(/cube root of/g, 'cbrt(')
    .replace(/cbrt of/g, 'cbrt(')
    .replace(/the cube of/g, '(')
    .replace(/cube of/g, '(')
    .replace(/cubed/g, '^3')
    .replace(/the square of/g, '(')
    .replace(/square of/g, '(')
    .replace(/squared/g, '^2')
    .replace(/plus/g, '+')
    .replace(/minus/g, '-')
    .replace(/times/g, '*')
    .replace(/multiplied by/g, '*')
    .replace(/divided by/g, '/')
    .replace(/percent of/g, '% *')
    .replace(/percent/g, '%')
    .replace(/sin of/g, 'sin(')
    .replace(/cos of/g, 'cos(')
    .replace(/tan of/g, 'tan(')
    .replace(/log of/g, 'log10(')
    .replace(/ln of/g, 'log(')
    .replace(/\bx\b/g, 'x')
    .trim();
  
  // Handle percentage calculations
  if (input.includes('%')) {
    input = input.replace(/(\d+)%\s*of\s*(\d+)/g, '$1 * $2 / 100');
    input = input.replace(/(\d+)%/g, '$1 / 100');
  }
  
  // Handle "of" operations (typically multiplication)
  input = input.replace(/(\d+)\s+of\s+(\d+)/g, '$1 * $2');
  
  // Handle equation solving
  if (input.includes('=') || input.includes(' equals ')) {
    input = input.replace(/ equals /g, ' = ');
  }
  
  // Close any open parentheses
  const openParens = (input.match(/\(/g) || []).length;
  const closeParens = (input.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    input += ')'.repeat(openParens - closeParens);
  }
  
  return input.trim();
};