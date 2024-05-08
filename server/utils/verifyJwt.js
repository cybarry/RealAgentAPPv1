import jwt from "jsonwebtoken";
import lodash from "lodash";

export const signJwt = (payload, options) => {
	const jwtSecret = process.env.JWTSECRET;

	return jwt.sign(payload, jwtSecret, {
		...(options && options),
	});
};


export const verifyJwt = (token)=> {
	try {
		const jwtSecret = process.env.JWTSECRET;

		const decoded = jwt.verify(token, jwtSecret);

		return decoded;
	} catch (error) {
		return null;
	}
};

export function signAccessTokenService(user) {
	const payload = lodash.pick(user.toJSON(),["email", "id"]);

	const accessToken = signJwt(payload, {
		expiresIn: "7d",
	});
	return accessToken;
}