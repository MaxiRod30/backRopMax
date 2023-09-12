import logger from "../helpers/helpersLoggers.js"

export const loggerTestGet = async (req, res) => {

    logger.fatal('Fatal log');
    logger.error('Error log');
    logger.warn('Warn log');
    logger.info('Info log');
    logger.http('HTTP log');
    logger.debug('Debug log');

    return res.status(200).json({ status: 'success'})

  };