import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import getEnv from '@/utils/server/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(404).json({});
		return;
	}

	try {
		await axios.post(`${getEnv().API_URI}/email`, req.body);
		res.status(201).json({});
	} catch(err) {
		res.status(500).json({ message: String(err) });
	}
}
