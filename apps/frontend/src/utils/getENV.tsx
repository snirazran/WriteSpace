export const getEnvVar = (name: string): string => {
  const value = import.meta.env[name];

  if (value === null) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};
