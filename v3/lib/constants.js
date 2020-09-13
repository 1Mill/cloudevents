const PROTOCOL_KAFKA = 'kafka'
const PROTOCOL_LAMBDA = 'lambda'

const ERROR_TYPES = ['unhandledRejection', 'uncaughtException']
const SIGNAL_TRAPS = ['SIGTERM', 'SIGINT', 'SIGUSR2']

module.exports = {
	// Supported protocols
	PROTOCOL_KAFKA,
	// Other constants
	ERROR_TYPES,
	SIGNAL_TRAPS,
};
