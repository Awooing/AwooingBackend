import chalk from 'chalk'

export const frmt = (...strings: any[]) =>
  chalk.hex('#8f53ee')('[Awooing]', chalk.hex('#67dbf0')(strings.join(' ')))

export const mdb = () => chalk.magenta('[MongoDB]')

export const err = (...strings: any[]) => chalk.red(strings.join(' '))
