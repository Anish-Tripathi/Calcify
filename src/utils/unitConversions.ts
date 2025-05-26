import * as math from 'mathjs';

export interface UnitCategory {
  id: string;
  name: string;
  units: UnitOption[];
}

export interface UnitOption {
  id: string;
  name: string;
  symbol: string;
  mathJsUnit: string;
}

// Length units
const lengthUnits: UnitOption[] = [
  { id: 'meter', name: 'Meter', symbol: 'm', mathJsUnit: 'm' },
  { id: 'kilometer', name: 'Kilometer', symbol: 'km', mathJsUnit: 'km' },
  { id: 'centimeter', name: 'Centimeter', symbol: 'cm', mathJsUnit: 'cm' },
  { id: 'millimeter', name: 'Millimeter', symbol: 'mm', mathJsUnit: 'mm' },
  { id: 'mile', name: 'Mile', symbol: 'mi', mathJsUnit: 'mi' },
  { id: 'yard', name: 'Yard', symbol: 'yd', mathJsUnit: 'yd' },
  { id: 'foot', name: 'Foot', symbol: 'ft', mathJsUnit: 'ft' },
  { id: 'inch', name: 'Inch', symbol: 'in', mathJsUnit: 'in' }
];

// Mass/Weight units
const massUnits: UnitOption[] = [
  { id: 'kilogram', name: 'Kilogram', symbol: 'kg', mathJsUnit: 'kg' },
  { id: 'gram', name: 'Gram', symbol: 'g', mathJsUnit: 'g' },
  { id: 'milligram', name: 'Milligram', symbol: 'mg', mathJsUnit: 'mg' },
  { id: 'pound', name: 'Pound', symbol: 'lb', mathJsUnit: 'lbm' },
  { id: 'ounce', name: 'Ounce', symbol: 'oz', mathJsUnit: 'oz' },
  { id: 'ton', name: 'Metric Ton', symbol: 't', mathJsUnit: 't' }
];

// Temperature units
const temperatureUnits: UnitOption[] = [
  { id: 'celsius', name: 'Celsius', symbol: '°C', mathJsUnit: 'degC' },
  { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', mathJsUnit: 'degF' },
  { id: 'kelvin', name: 'Kelvin', symbol: 'K', mathJsUnit: 'K' }
];

// Time units
const timeUnits: UnitOption[] = [
  { id: 'second', name: 'Second', symbol: 's', mathJsUnit: 's' },
  { id: 'minute', name: 'Minute', symbol: 'min', mathJsUnit: 'min' },
  { id: 'hour', name: 'Hour', symbol: 'h', mathJsUnit: 'h' },
  { id: 'day', name: 'Day', symbol: 'd', mathJsUnit: 'd' },
  { id: 'week', name: 'Week', symbol: 'wk', mathJsUnit: 'week' },
  { id: 'month', name: 'Month (avg)', symbol: 'mo', mathJsUnit: 'month' },
  { id: 'year', name: 'Year', symbol: 'yr', mathJsUnit: 'year' }
];

// Volume units
const volumeUnits: UnitOption[] = [
  { id: 'liter', name: 'Liter', symbol: 'L', mathJsUnit: 'l' },
  { id: 'milliliter', name: 'Milliliter', symbol: 'mL', mathJsUnit: 'ml' },
  { id: 'cubicMeter', name: 'Cubic Meter', symbol: 'm³', mathJsUnit: 'm^3' },
  { id: 'gallon', name: 'Gallon (US)', symbol: 'gal', mathJsUnit: 'gal' },
  { id: 'quart', name: 'Quart (US)', symbol: 'qt', mathJsUnit: 'qt' },
  { id: 'pint', name: 'Pint (US)', symbol: 'pt', mathJsUnit: 'pt' },
  { id: 'fluidOunce', name: 'Fluid Ounce (US)', symbol: 'fl oz', mathJsUnit: 'floz' }
];

// Area units
const areaUnits: UnitOption[] = [
  { id: 'squareMeter', name: 'Square Meter', symbol: 'm²', mathJsUnit: 'm^2' },
  { id: 'squareFoot', name: 'Square Foot', symbol: 'ft²', mathJsUnit: 'ft^2' },
  { id: 'squareInch', name: 'Square Inch', symbol: 'in²', mathJsUnit: 'in^2' },
  { id: 'acre', name: 'Acre', symbol: 'ac', mathJsUnit: 'acre' },
  { id: 'hectare', name: 'Hectare', symbol: 'ha', mathJsUnit: 'hectare' },
  { id: 'squareKilometer', name: 'Square Kilometer', symbol: 'km²', mathJsUnit: 'km^2' },
  { id: 'squareMile', name: 'Square Mile', symbol: 'mi²', mathJsUnit: 'mi^2' }
];

// Data units
const dataUnits: UnitOption[] = [
  { id: 'bit', name: 'Bit', symbol: 'b', mathJsUnit: 'b' },
  { id: 'byte', name: 'Byte', symbol: 'B', mathJsUnit: 'B' },
  { id: 'kilobyte', name: 'Kilobyte', symbol: 'kB', mathJsUnit: 'kB' },
  { id: 'megabyte', name: 'Megabyte', symbol: 'MB', mathJsUnit: 'MB' },
  { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB', mathJsUnit: 'GB' },
  { id: 'terabyte', name: 'Terabyte', symbol: 'TB', mathJsUnit: 'TB' }
];

// Speed units
const speedUnits: UnitOption[] = [
  { id: 'metersPerSecond', name: 'Meters per Second', symbol: 'm/s', mathJsUnit: 'm/s' },
  { id: 'kilometersPerHour', name: 'Kilometers per Hour', symbol: 'km/h', mathJsUnit: 'km/h' },
  { id: 'milesPerHour', name: 'Miles per Hour', symbol: 'mph', mathJsUnit: 'mi/h' },
  { id: 'knot', name: 'Knot', symbol: 'kn', mathJsUnit: 'knot' }
];

// Group all unit categories
export const unitCategories: UnitCategory[] = [
  { id: 'length', name: 'Length', units: lengthUnits },
  { id: 'mass', name: 'Weight', units: massUnits },
  { id: 'temperature', name: 'Temperature', units: temperatureUnits },
  { id: 'time', name: 'Time', units: timeUnits },
  { id: 'volume', name: 'Volume', units: volumeUnits },
  { id: 'area', name: 'Area', units: areaUnits },
  { id: 'data', name: 'Data', units: dataUnits },
  { id: 'speed', name: 'Speed', units: speedUnits }
];

// Helper function to find a unit by its ID
export const findUnitById = (unitId: string): UnitOption | undefined => {
  for (const category of unitCategories) {
    const unit = category.units.find(u => u.id === unitId);
    if (unit) return unit;
  }
  return undefined;
};

// Helper function to find a category by unit ID
export const findCategoryByUnitId = (unitId: string): UnitCategory | undefined => {
  return unitCategories.find(category => 
    category.units.some(unit => unit.id === unitId)
  );
};

// Function to perform unit conversion
export const convertUnitValue = (
  value: number,
  fromUnitId: string,
  toUnitId: string
): number => {
  const fromUnit = findUnitById(fromUnitId);
  const toUnit = findUnitById(toUnitId);
  
  if (!fromUnit || !toUnit) {
    throw new Error('Invalid unit selection');
  }
  
  try {
    return math.unit(value, fromUnit.mathJsUnit).toNumber(toUnit.mathJsUnit);
  } catch (error) {
    console.error('Unit conversion error:', error);
    throw new Error('Cannot convert between these units');
  }
};