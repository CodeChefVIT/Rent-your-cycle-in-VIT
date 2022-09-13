import chalk from "chalk";

// create getTimeStamp function
const getTimeStamp = () => {
  const now = new Date();
  return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
};

/**
 * Logs a message in green to the console
 * @param  {string} namespace The namespace of the message
 * @param  {string} message   The message to log 
 * @param  {any}    object    The object to log
 */
export const info = (namespace: string, message: string, object?: Record<string, unknown>): void => {
    if (object) {
        console.log(chalk.green(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`), object);
    } else {  
        console.log(chalk.green(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
    }
};

/**
 * Logs a message in yellow to the console
 * @param  {string} namespace The namespace of the message
 * @param  {string} message   The message to log
 * @param  {any}    object    The object to log
 * @return {void} 
*/
export const warn = (namespace: string, message: string, object?: Record<string, unknown>): void => {
    if (object) {
        console.log(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`), object);
    } else {  
        console.log(chalk.yellow(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
    }
};
/**
 * Logs a message in red to the console
 * @param  {string} namespace The namespace of the message
 * @param  {string} message   The message to log
 * @param  {any}    object    The object to log
 * @return {void} 
*/
export const error = (namespace: string, message: string, object?: Record<string, unknown>): void => {
    if (object) {
        console.log(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`), object);
    } else {  
        console.log(chalk.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
    }
};
/**
 * Logs a message in blue to the console
 * @param  {string} namespace The namespace of the message
 * @param  {string} message   The message to log
 * @param  {any}    object    The object to log
 * @return {void} 
*/
export const debug = (namespace: string, message: string, object?: Record<string, unknown>): void => {
    if (object) {
        console.log(chalk.blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`), object);
    } else {  
        console.log(chalk.blue(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
    }
};
