import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

function parseConfigValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicRuntimeConfig } = getConfig()

  const config: Record<string, any> = Object.entries(publicRuntimeConfig)
    .filter(([key]) => key.startsWith('REDDIUM_'))
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: parseConfigValue(value as string)
    }), {});

  if (Object.keys(config).length === 0) {
    console.warn('No REDDIUM_ variables found in publicRuntimeConfig');
  }

  res.status(200).json(config);
}
