/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';

const HOLIDAYS = new Set([
  '2018-01-01',
  '2018-02-15',
  '2018-02-16',
  '2018-02-17',
  '2018-02-18',
  '2018-02-19',
  '2018-02-20',
  '2018-02-21',
  '2018-04-05',
  '2018-04-06',
  '2018-04-07',
  '2018-04-29',
  '2018-04-30',
  '2018-05-01',
  '2018-06-16',
  '2018-06-17',
  '2018-06-18',
  '2018-09-22',
  '2018-09-23',
  '2018-09-24',
  '2018-10-01',
  '2018-10-02',
  '2018-10-03',
  '2018-10-04',
  '2018-10-05',
  '2018-10-06',
  '2018-10-07',
  '2019-01-01',
  '2019-02-04',
  '2019-02-05',
  '2019-02-06',
  '2019-02-07',
  '2019-02-08',
  '2019-02-09',
  '2019-02-10',
  '2019-04-05',
  '2019-05-01',
  '2019-05-02',
  '2019-05-03',
  '2019-05-04',
  '2019-06-07',
  '2019-09-13',
  '2019-10-01',
  '2019-10-02',
  '2019-10-03',
  '2019-10-04',
  '2019-10-05',
  '2019-10-06',
  '2019-10-07',
  '2020-01-01',
  '2020-01-24',
  '2020-01-25',
  '2020-01-26',
  '2020-01-27',
  '2020-01-28',
  '2020-01-29',
  '2020-01-30',
  '2020-01-31',
  '2020-02-01',
  '2020-02-02',
  '2020-04-04',
  '2020-04-05',
  '2020-04-06',
  '2020-05-01',
  '2020-05-02',
  '2020-05-03',
  '2020-05-04',
  '2020-05-05',
  '2020-06-25',
  '2020-06-26',
  '2020-06-27',
  '2020-10-01',
  '2020-10-02',
  '2020-10-03',
  '2020-10-04',
  '2020-10-05',
  '2020-10-06',
  '2020-10-07',
  '2020-10-08',
  '2021-01-01',
  '2021-01-02',
  '2021-01-03',
  '2021-02-11',
  '2021-02-12',
  '2021-02-13',
  '2021-02-14',
  '2021-02-15',
  '2021-02-16',
  '2021-02-17',
  '2021-04-03',
  '2021-04-04',
  '2021-04-05',
  '2021-05-01',
  '2021-05-02',
  '2021-05-03',
  '2021-05-04',
  '2021-05-05',
  '2021-06-12',
  '2021-06-13',
  '2021-06-14',
  '2021-09-19',
  '2021-09-20',
  '2021-09-21',
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07',
  '2022-01-01',
  '2022-01-02',
  '2022-01-03',
  '2022-01-31',
  '2022-02-01',
  '2022-02-02',
  '2022-02-03',
  '2022-02-04',
  '2022-02-05',
  '2022-02-06',
  '2022-04-03',
  '2022-04-04',
  '2022-04-05',
  '2022-04-30',
  '2022-05-01',
  '2022-05-02',
  '2022-05-03',
  '2022-05-04',
  '2022-06-03',
  '2022-06-04',
  '2022-06-05',
  '2022-09-10',
  '2022-09-11',
  '2022-09-12',
  '2022-10-01',
  '2022-10-02',
  '2022-10-03',
  '2022-10-04',
  '2022-10-05',
  '2022-10-06',
  '2022-10-07',
  '2022-12-31',
  '2023-01-01',
  '2023-01-02',
  '2023-01-21',
  '2023-01-22',
  '2023-01-23',
  '2023-01-24',
  '2023-01-25',
  '2023-01-26',
  '2023-01-27',
  '2023-04-05',
  '2023-04-29',
  '2023-04-30',
  '2023-05-01',
  '2023-05-02',
  '2023-05-03',
  '2023-06-22',
  '2023-06-23',
  '2023-06-24',
  '2023-09-29',
  '2023-09-30',
  '2023-10-01',
  '2023-10-02',
  '2023-10-03',
  '2023-10-04',
  '2023-10-05',
  '2023-10-06',
  '2002-01-05',
  '2002-01-06',
  '2002-01-12',
  '2002-01-13',
  '2002-01-19',
  '2002-01-20',
  '2002-01-26',
  '2002-01-27',
  '2002-02-02',
  '2002-02-03',
  '2002-02-23',
  '2002-02-24',
  '2002-03-02',
  '2002-03-03',
  '2002-03-09',
  '2002-03-10',
  '2002-03-16',
  '2002-03-17',
  '2002-03-23',
  '2002-03-24',
  '2002-03-30',
  '2002-03-31',
  '2002-04-06',
  '2002-04-07',
  '2002-04-13',
  '2002-04-14',
  '2002-04-20',
  '2002-04-21',
  '2002-05-11',
  '2002-05-12',
  '2002-05-18',
  '2002-05-19',
  '2002-05-25',
  '2002-05-26',
  '2002-06-01',
  '2002-06-02',
  '2002-06-08',
  '2002-06-09',
  '2002-06-15',
  '2002-06-16',
  '2002-06-22',
  '2002-06-23',
  '2002-06-29',
  '2002-06-30',
  '2002-07-06',
  '2002-07-07',
  '2002-07-13',
  '2002-07-14',
  '2002-07-20',
  '2002-07-21',
  '2002-07-27',
  '2002-07-28',
  '2002-08-03',
  '2002-08-04',
  '2002-08-10',
  '2002-08-11',
  '2002-08-17',
  '2002-08-18',
  '2002-08-24',
  '2002-08-25',
  '2002-08-31',
  '2002-09-01',
  '2002-09-07',
  '2002-09-08',
  '2002-09-14',
  '2002-09-15',
  '2002-09-21',
  '2002-09-22',
  '2002-10-12',
  '2002-10-13',
  '2002-10-19',
  '2002-10-20',
  '2002-10-26',
  '2002-10-27',
  '2002-11-02',
  '2002-11-03',
  '2002-11-09',
  '2002-11-10',
  '2002-11-16',
  '2002-11-17',
  '2002-11-23',
  '2002-11-24',
  '2002-11-30',
  '2002-12-01',
  '2002-12-07',
  '2002-12-08',
  '2002-12-14',
  '2002-12-15',
  '2002-12-21',
  '2002-12-22',
  '2002-12-28',
  '2002-12-29',
  '2003-01-04',
  '2003-01-05',
  '2003-01-11',
  '2003-01-12',
  '2003-01-18',
  '2003-01-19',
  '2003-01-25',
  '2003-01-26',
  '2003-02-15',
  '2003-02-16',
  '2003-02-22',
  '2003-02-23',
  '2003-03-01',
  '2003-03-02',
  '2003-03-08',
  '2003-03-09',
  '2003-03-15',
  '2003-03-16',
  '2003-03-22',
  '2003-03-23',
  '2003-03-29',
  '2003-03-30',
  '2003-04-05',
  '2003-04-06',
  '2003-04-12',
  '2003-04-13',
  '2003-04-19',
  '2003-04-20',
  '2003-05-10',
  '2003-05-11',
  '2003-05-17',
  '2003-05-18',
  '2003-05-24',
  '2003-05-25',
  '2003-05-31',
  '2003-06-01',
  '2003-06-07',
  '2003-06-08',
  '2003-06-14',
  '2003-06-15',
  '2003-06-21',
  '2003-06-22',
  '2003-06-28',
  '2003-06-29',
  '2003-07-05',
  '2003-07-06',
  '2003-07-12',
  '2003-07-13',
  '2003-07-19',
  '2003-07-20',
  '2003-07-26',
  '2003-07-27',
  '2003-08-02',
  '2003-08-03',
  '2003-08-09',
  '2003-08-10',
  '2003-08-16',
  '2003-08-17',
  '2003-08-23',
  '2003-08-24',
  '2003-08-30',
  '2003-08-31',
  '2003-09-06',
  '2003-09-07',
  '2003-09-13',
  '2003-09-14',
  '2003-09-20',
  '2003-09-21',
  '2003-10-11',
  '2003-10-12',
  '2003-10-18',
  '2003-10-19',
  '2003-10-25',
  '2003-10-26',
  '2003-11-01',
  '2003-11-02',
  '2003-11-08',
  '2003-11-09',
  '2003-11-15',
  '2003-11-16',
  '2003-11-22',
  '2003-11-23',
  '2003-11-29',
  '2003-11-30',
  '2003-12-06',
  '2003-12-07',
  '2003-12-13',
  '2003-12-14',
  '2003-12-20',
  '2003-12-21',
  '2003-12-27',
  '2003-12-28',
  '2004-01-03',
  '2004-01-04',
  '2004-01-10',
  '2004-01-11',
  '2004-01-31',
  '2004-02-01',
  '2004-02-07',
  '2004-02-08',
  '2004-02-14',
  '2004-02-15',
  '2004-02-21',
  '2004-02-22',
  '2004-02-28',
  '2004-02-29',
  '2004-03-06',
  '2004-03-07',
  '2004-03-13',
  '2004-03-14',
  '2004-03-20',
  '2004-03-21',
  '2004-03-27',
  '2004-03-28',
  '2004-04-03',
  '2004-04-04',
  '2004-04-10',
  '2004-04-11',
  '2004-04-17',
  '2004-04-18',
  '2004-04-24',
  '2004-04-25',
  '2004-05-15',
  '2004-05-16',
  '2004-05-22',
  '2004-05-23',
  '2004-05-29',
  '2004-05-30',
  '2004-06-05',
  '2004-06-06',
  '2004-06-12',
  '2004-06-13',
  '2004-06-19',
  '2004-06-20',
  '2004-06-26',
  '2004-06-27',
  '2004-07-03',
  '2004-07-04',
  '2004-07-10',
  '2004-07-11',
  '2004-07-17',
  '2004-07-18',
  '2004-07-24',
  '2004-07-25',
  '2004-07-31',
  '2004-08-01',
  '2004-08-07',
  '2004-08-08',
  '2004-08-14',
  '2004-08-15',
  '2004-08-21',
  '2004-08-22',
  '2004-08-28',
  '2004-08-29',
  '2004-09-04',
  '2004-09-05',
  '2004-09-11',
  '2004-09-12',
  '2004-09-18',
  '2004-09-19',
  '2004-09-25',
  '2004-09-26',
  '2004-10-16',
  '2004-10-17',
  '2004-10-23',
  '2004-10-24',
  '2004-10-30',
  '2004-10-31',
  '2004-11-06',
  '2004-11-07',
  '2004-11-13',
  '2004-11-14',
  '2004-11-20',
  '2004-11-21',
  '2004-11-27',
  '2004-11-28',
  '2004-12-04',
  '2004-12-05',
  '2004-12-11',
  '2004-12-12',
  '2004-12-18',
  '2004-12-19',
  '2004-12-25',
  '2004-12-26',
  '2005-01-08',
  '2005-01-09',
  '2005-01-15',
  '2005-01-16',
  '2005-01-22',
  '2005-01-23',
  '2005-01-29',
  '2005-01-30',
  '2005-02-19',
  '2005-02-20',
  '2005-02-26',
  '2005-02-27',
  '2005-03-05',
  '2005-03-06',
  '2005-03-12',
  '2005-03-13',
  '2005-03-19',
  '2005-03-20',
  '2005-03-26',
  '2005-03-27',
  '2005-04-02',
  '2005-04-03',
  '2005-04-09',
  '2005-04-10',
  '2005-04-16',
  '2005-04-17',
  '2005-04-23',
  '2005-04-24',
  '2005-05-14',
  '2005-05-15',
  '2005-05-21',
  '2005-05-22',
  '2005-05-28',
  '2005-05-29',
  '2005-06-04',
  '2005-06-05',
  '2005-06-11',
  '2005-06-12',
  '2005-06-18',
  '2005-06-19',
  '2005-06-25',
  '2005-06-26',
  '2005-07-02',
  '2005-07-03',
  '2005-07-09',
  '2005-07-10',
  '2005-07-16',
  '2005-07-17',
  '2005-07-23',
  '2005-07-24',
  '2005-07-30',
  '2005-07-31',
  '2005-08-06',
  '2005-08-07',
  '2005-08-13',
  '2005-08-14',
  '2005-08-20',
  '2005-08-21',
  '2005-08-27',
  '2005-08-28',
  '2005-09-03',
  '2005-09-04',
  '2005-09-10',
  '2005-09-11',
  '2005-09-17',
  '2005-09-18',
  '2005-09-24',
  '2005-09-25',
  '2005-10-15',
  '2005-10-16',
  '2005-10-22',
  '2005-10-23',
  '2005-10-29',
  '2005-10-30',
  '2005-11-05',
  '2005-11-06',
  '2005-11-12',
  '2005-11-13',
  '2005-11-19',
  '2005-11-20',
  '2005-11-26',
  '2005-11-27',
  '2005-12-03',
  '2005-12-04',
  '2005-12-10',
  '2005-12-11',
  '2005-12-17',
  '2005-12-18',
  '2005-12-24',
  '2005-12-25',
  '2006-01-07',
  '2006-01-08',
  '2006-01-14',
  '2006-01-15',
  '2006-01-21',
  '2006-01-22',
  '2006-02-11',
  '2006-02-12',
  '2006-02-18',
  '2006-02-19',
  '2006-02-25',
  '2006-02-26',
  '2006-03-04',
  '2006-03-05',
  '2006-03-11',
  '2006-03-12',
  '2006-03-18',
  '2006-03-19',
  '2006-03-25',
  '2006-03-26',
  '2006-04-01',
  '2006-04-02',
  '2006-04-08',
  '2006-04-09',
  '2006-04-15',
  '2006-04-16',
  '2006-04-22',
  '2006-04-23',
  '2006-05-13',
  '2006-05-14',
  '2006-05-20',
  '2006-05-21',
  '2006-05-27',
  '2006-05-28',
  '2006-06-03',
  '2006-06-04',
  '2006-06-10',
  '2006-06-11',
  '2006-06-17',
  '2006-06-18',
  '2006-06-24',
  '2006-06-25',
  '2006-07-01',
  '2006-07-02',
  '2006-07-08',
  '2006-07-09',
  '2006-07-15',
  '2006-07-16',
  '2006-07-22',
  '2006-07-23',
  '2006-07-29',
  '2006-07-30',
  '2006-08-05',
  '2006-08-06',
  '2006-08-12',
  '2006-08-13',
  '2006-08-19',
  '2006-08-20',
  '2006-08-26',
  '2006-08-27',
  '2006-09-02',
  '2006-09-03',
  '2006-09-09',
  '2006-09-10',
  '2006-09-16',
  '2006-09-17',
  '2006-09-23',
  '2006-09-24',
  '2006-10-14',
  '2006-10-15',
  '2006-10-21',
  '2006-10-22',
  '2006-10-28',
  '2006-10-29',
  '2006-11-04',
  '2006-11-05',
  '2006-11-11',
  '2006-11-12',
  '2006-11-18',
  '2006-11-19',
  '2006-11-25',
  '2006-11-26',
  '2006-12-02',
  '2006-12-03',
  '2006-12-09',
  '2006-12-10',
  '2006-12-16',
  '2006-12-17',
  '2006-12-23',
  '2006-12-24',
  '2007-01-06',
  '2007-01-07',
  '2007-01-13',
  '2007-01-14',
  '2007-01-20',
  '2007-01-21',
  '2007-01-27',
  '2007-01-28',
  '2007-02-03',
  '2007-02-04',
  '2007-02-10',
  '2007-02-11',
  '2007-03-03',
  '2007-03-04',
  '2007-03-10',
  '2007-03-11',
  '2007-03-17',
  '2007-03-18',
  '2007-03-24',
  '2007-03-25',
  '2007-03-31',
  '2007-04-01',
  '2007-04-07',
  '2007-04-08',
  '2007-04-14',
  '2007-04-15',
  '2007-04-21',
  '2007-04-22',
  '2007-05-12',
  '2007-05-13',
  '2007-05-19',
  '2007-05-20',
  '2007-05-26',
  '2007-05-27',
  '2007-06-02',
  '2007-06-03',
  '2007-06-09',
  '2007-06-10',
  '2007-06-16',
  '2007-06-17',
  '2007-06-23',
  '2007-06-24',
  '2007-06-30',
  '2007-07-01',
  '2007-07-07',
  '2007-07-08',
  '2007-07-14',
  '2007-07-15',
  '2007-07-21',
  '2007-07-22',
  '2007-07-28',
  '2007-07-29',
  '2007-08-04',
  '2007-08-05',
  '2007-08-11',
  '2007-08-12',
  '2007-08-18',
  '2007-08-19',
  '2007-08-25',
  '2007-08-26',
  '2007-09-01',
  '2007-09-02',
  '2007-09-08',
  '2007-09-09',
  '2007-09-15',
  '2007-09-16',
  '2007-09-22',
  '2007-09-23',
  '2007-10-13',
  '2007-10-14',
  '2007-10-20',
  '2007-10-21',
  '2007-10-27',
  '2007-10-28',
  '2007-11-03',
  '2007-11-04',
  '2007-11-10',
  '2007-11-11',
  '2007-11-17',
  '2007-11-18',
  '2007-11-24',
  '2007-11-25',
  '2007-12-01',
  '2007-12-02',
  '2007-12-08',
  '2007-12-09',
  '2007-12-15',
  '2007-12-16',
  '2007-12-22',
  '2007-12-23',
  '2007-12-29',
  '2008-01-05',
  '2008-01-06',
  '2008-01-12',
  '2008-01-13',
  '2008-01-19',
  '2008-01-20',
  '2008-01-26',
  '2008-01-27',
  '2008-02-02',
  '2008-02-03',
  '2008-02-09',
  '2008-02-10',
  '2008-02-23',
  '2008-03-01',
  '2008-03-02',
  '2008-03-08',
  '2008-03-09',
  '2008-03-15',
  '2008-03-16',
  '2008-03-22',
  '2008-03-23',
  '2008-03-29',
  '2008-03-30',
  '2008-04-12',
  '2008-04-13',
  '2008-04-19',
  '2008-04-20',
  '2008-04-26',
  '2008-04-27',
  '2008-05-03',
  '2008-05-04',
  '2008-05-10',
  '2008-05-11',
  '2008-05-17',
  '2008-05-18',
  '2008-05-24',
  '2008-05-25',
  '2008-05-31',
  '2008-06-01',
  '2008-06-07',
  '2008-06-08',
  '2008-06-14',
  '2008-06-15',
  '2008-06-21',
  '2008-06-22',
  '2008-06-28',
  '2008-06-29',
  '2008-07-05',
  '2008-07-06',
  '2008-07-12',
  '2008-07-13',
  '2008-07-19',
  '2008-07-20',
  '2008-07-26',
  '2008-07-27',
  '2008-08-02',
  '2008-08-03',
  '2008-08-09',
  '2008-08-10',
  '2008-08-16',
  '2008-08-17',
  '2008-08-23',
  '2008-08-24',
  '2008-08-30',
  '2008-08-31',
  '2008-09-06',
  '2008-09-07',
  '2008-09-13',
  '2008-09-14',
  '2008-09-20',
  '2008-09-21',
  '2008-09-27',
  '2008-09-28',
  '2008-10-11',
  '2008-10-12',
  '2008-10-18',
  '2008-10-19',
  '2008-10-25',
  '2008-10-26',
  '2008-11-01',
  '2008-11-02',
  '2008-11-08',
  '2008-11-09',
  '2008-11-15',
  '2008-11-16',
  '2008-11-22',
  '2008-11-23',
  '2008-11-29',
  '2008-11-30',
  '2008-12-06',
  '2008-12-07',
  '2008-12-13',
  '2008-12-14',
  '2008-12-20',
  '2008-12-21',
  '2008-12-27',
  '2008-12-28',
  '2009-01-10',
  '2009-01-11',
  '2009-01-17',
  '2009-01-18',
  '2009-02-07',
  '2009-02-08',
  '2009-02-14',
  '2009-02-15',
  '2009-02-21',
  '2009-02-22',
  '2009-02-28',
  '2009-03-01',
  '2009-03-07',
  '2009-03-08',
  '2009-03-14',
  '2009-03-15',
  '2009-03-21',
  '2009-03-22',
  '2009-03-28',
  '2009-03-29',
  '2009-04-11',
  '2009-04-12',
  '2009-04-18',
  '2009-04-19',
  '2009-04-25',
  '2009-04-26',
  '2009-05-09',
  '2009-05-10',
  '2009-05-16',
  '2009-05-17',
  '2009-05-23',
  '2009-05-24',
  '2009-06-06',
  '2009-06-07',
  '2009-06-13',
  '2009-06-14',
  '2009-06-20',
  '2009-06-21',
  '2009-06-27',
  '2009-06-28',
  '2009-07-04',
  '2009-07-05',
  '2009-07-11',
  '2009-07-12',
  '2009-07-18',
  '2009-07-19',
  '2009-07-25',
  '2009-07-26',
  '2009-08-01',
  '2009-08-02',
  '2009-08-08',
  '2009-08-09',
  '2009-08-15',
  '2009-08-16',
  '2009-08-22',
  '2009-08-23',
  '2009-08-29',
  '2009-08-30',
  '2009-09-05',
  '2009-09-06',
  '2009-09-12',
  '2009-09-13',
  '2009-09-19',
  '2009-09-20',
  '2009-10-04',
  '2009-10-05',
  '2009-10-06',
  '2009-10-07',
  '2009-10-08',
  '2009-10-11',
  '2009-10-17',
  '2009-10-18',
  '2009-10-24',
  '2009-10-25',
  '2009-10-31',
  '2009-11-01',
  '2009-11-07',
  '2009-11-08',
  '2009-11-14',
  '2009-11-15',
  '2009-11-21',
  '2009-11-22',
  '2009-11-28',
  '2009-11-29',
  '2009-12-05',
  '2009-12-06',
  '2009-12-12',
  '2009-12-13',
  '2009-12-19',
  '2009-12-20',
  '2009-12-26',
  '2009-12-27',
  '2010-01-09',
  '2010-01-10',
  '2010-01-16',
  '2010-01-17',
  '2010-01-23',
  '2010-01-24',
  '2010-01-30',
  '2010-01-31',
  '2010-02-06',
  '2010-02-07',
  '2010-02-27',
  '2010-02-28',
  '2010-03-06',
  '2010-03-07',
  '2010-03-13',
  '2010-03-14',
  '2010-03-20',
  '2010-03-21',
  '2010-03-27',
  '2010-03-28',
  '2010-04-10',
  '2010-04-11',
  '2010-04-17',
  '2010-04-18',
  '2010-04-24',
  '2010-04-25',
  '2010-05-08',
  '2010-05-09',
  '2010-05-15',
  '2010-05-16',
  '2010-05-22',
  '2010-05-23',
  '2010-05-29',
  '2010-05-30',
  '2010-06-05',
  '2010-06-06',
  '2010-06-19',
  '2010-06-20',
  '2010-06-26',
  '2010-06-27',
  '2010-07-03',
  '2010-07-04',
  '2010-07-10',
  '2010-07-11',
  '2010-07-17',
  '2010-07-18',
  '2010-07-24',
  '2010-07-25',
  '2010-07-31',
  '2010-08-01',
  '2010-08-07',
  '2010-08-08',
  '2010-08-14',
  '2010-08-15',
  '2010-08-21',
  '2010-08-22',
  '2010-08-28',
  '2010-08-29',
  '2010-09-04',
  '2010-09-05',
  '2010-09-11',
  '2010-09-12',
  '2010-09-18',
  '2010-10-10',
  '2010-10-16',
  '2010-10-17',
  '2010-10-23',
  '2010-10-24',
  '2010-10-30',
  '2010-10-31',
  '2010-11-06',
  '2010-11-07',
  '2010-11-13',
  '2010-11-14',
  '2010-11-20',
  '2010-11-21',
  '2010-11-27',
  '2010-11-28',
  '2010-12-04',
  '2010-12-05',
  '2010-12-11',
  '2010-12-12',
  '2010-12-18',
  '2010-12-19',
  '2010-12-25',
  '2010-12-26',
  '2011-01-08',
  '2011-01-09',
  '2011-01-15',
  '2011-01-16',
  '2011-01-22',
  '2011-01-23',
  '2011-01-29',
  '2011-02-13',
  '2011-02-19',
  '2011-02-20',
  '2011-02-26',
  '2011-02-27',
  '2011-03-05',
  '2011-03-06',
  '2011-03-12',
  '2011-03-13',
  '2011-03-19',
  '2011-03-20',
  '2011-03-26',
  '2011-03-27',
  '2011-04-09',
  '2011-04-10',
  '2011-04-16',
  '2011-04-17',
  '2011-04-23',
  '2011-04-24',
  '2011-05-07',
  '2011-05-08',
  '2011-05-14',
  '2011-05-15',
  '2011-05-21',
  '2011-05-22',
  '2011-05-28',
  '2011-05-29',
  '2011-06-11',
  '2011-06-12',
  '2011-06-18',
  '2011-06-19',
  '2011-06-25',
  '2011-06-26',
  '2011-07-02',
  '2011-07-03',
  '2011-07-09',
  '2011-07-10',
  '2011-07-16',
  '2011-07-17',
  '2011-07-23',
  '2011-07-24',
  '2011-07-30',
  '2011-07-31',
  '2011-08-06',
  '2011-08-07',
  '2011-08-13',
  '2011-08-14',
  '2011-08-20',
  '2011-08-21',
  '2011-08-27',
  '2011-08-28',
  '2011-09-03',
  '2011-09-04',
  '2011-09-17',
  '2011-09-18',
  '2011-09-24',
  '2011-09-25',
  '2011-10-15',
  '2011-10-16',
  '2011-10-22',
  '2011-10-23',
  '2011-10-29',
  '2011-10-30',
  '2011-11-05',
  '2011-11-06',
  '2011-11-12',
  '2011-11-13',
  '2011-11-19',
  '2011-11-20',
  '2011-11-26',
  '2011-11-27',
  '2011-12-03',
  '2011-12-04',
  '2011-12-10',
  '2011-12-11',
  '2011-12-17',
  '2011-12-18',
  '2011-12-24',
  '2011-12-25',
  '2012-01-07',
  '2012-01-08',
  '2012-01-14',
  '2012-01-15',
  '2012-02-04',
  '2012-02-05',
  '2012-02-11',
  '2012-02-12',
  '2012-02-18',
  '2012-02-19',
  '2012-02-25',
  '2012-02-26',
  '2012-03-03',
  '2012-03-04',
  '2012-03-10',
  '2012-03-11',
  '2012-03-17',
  '2012-03-18',
  '2012-03-24',
  '2012-03-25',
  '2012-04-07',
  '2012-04-08',
  '2012-04-14',
  '2012-04-15',
  '2012-04-21',
  '2012-04-22',
  '2012-05-05',
  '2012-05-06',
  '2012-05-12',
  '2012-05-13',
  '2012-05-19',
  '2012-05-20',
  '2012-05-26',
  '2012-05-27',
  '2012-06-02',
  '2012-06-03',
  '2012-06-09',
  '2012-06-10',
  '2012-06-16',
  '2012-06-17',
  '2012-06-30',
  '2012-07-01',
  '2012-07-07',
  '2012-07-08',
  '2012-07-14',
  '2012-07-15',
  '2012-07-21',
  '2012-07-22',
  '2012-07-28',
  '2012-07-29',
  '2012-08-04',
  '2012-08-05',
  '2012-08-11',
  '2012-08-12',
  '2012-08-18',
  '2012-08-19',
  '2012-08-25',
  '2012-08-26',
  '2012-09-01',
  '2012-09-02',
  '2012-09-08',
  '2012-09-09',
  '2012-09-15',
  '2012-09-16',
  '2012-09-22',
  '2012-09-23',
  '2012-10-13',
  '2012-10-14',
  '2012-10-20',
  '2012-10-21',
  '2012-10-27',
  '2012-10-28',
  '2012-11-03',
  '2012-11-04',
  '2012-11-10',
  '2012-11-11',
  '2012-11-17',
  '2012-11-18',
  '2012-11-24',
  '2012-11-25',
  '2012-12-01',
  '2012-12-02',
  '2012-12-08',
  '2012-12-09',
  '2012-12-15',
  '2012-12-16',
  '2012-12-22',
  '2012-12-23',
  '2012-12-29',
  '2012-12-30',
  '2013-01-12',
  '2013-01-13',
  '2013-01-19',
  '2013-01-20',
  '2013-01-26',
  '2013-01-27',
  '2013-02-02',
  '2013-02-03',
  '2013-02-23',
  '2013-02-24',
  '2013-03-02',
  '2013-03-03',
  '2013-03-09',
  '2013-03-10',
  '2013-03-16',
  '2013-03-17',
  '2013-03-23',
  '2013-03-24',
  '2013-03-30',
  '2013-03-31',
  '2013-04-13',
  '2013-04-14',
  '2013-04-20',
  '2013-04-21',
  '2013-05-04',
  '2013-05-05',
  '2013-05-11',
  '2013-05-12',
  '2013-05-18',
  '2013-05-19',
  '2013-05-25',
  '2013-05-26',
  '2013-06-01',
  '2013-06-02',
  '2013-06-15',
  '2013-06-16',
  '2013-06-22',
  '2013-06-23',
  '2013-06-29',
  '2013-06-30',
  '2013-07-06',
  '2013-07-07',
  '2013-07-13',
  '2013-07-14',
  '2013-07-20',
  '2013-07-21',
  '2013-07-27',
  '2013-07-28',
  '2013-08-03',
  '2013-08-04',
  '2013-08-10',
  '2013-08-11',
  '2013-08-17',
  '2013-08-18',
  '2013-08-24',
  '2013-08-25',
  '2013-08-31',
  '2013-09-01',
  '2013-09-07',
  '2013-09-08',
  '2013-09-14',
  '2013-09-15',
  '2013-09-28',
  '2013-10-13',
  '2013-10-19',
  '2013-10-20',
  '2013-10-26',
  '2013-10-27',
  '2013-11-02',
  '2013-11-03',
  '2013-11-09',
  '2013-11-10',
  '2013-11-16',
  '2013-11-17',
  '2013-11-23',
  '2013-11-24',
  '2013-11-30',
  '2013-12-01',
  '2013-12-07',
  '2013-12-08',
  '2013-12-14',
  '2013-12-15',
  '2013-12-21',
  '2013-12-22',
  '2013-12-28',
  '2013-12-29',
  '2014-01-04',
  '2014-01-05',
  '2014-01-11',
  '2014-01-12',
  '2014-01-18',
  '2014-01-19',
  '2014-01-25',
  '2014-02-09',
  '2014-02-15',
  '2014-02-16',
  '2014-02-22',
  '2014-02-23',
  '2014-03-01',
  '2014-03-02',
  '2014-03-08',
  '2014-03-09',
  '2014-03-15',
  '2014-03-16',
  '2014-03-22',
  '2014-03-23',
  '2014-03-29',
  '2014-03-30',
  '2014-04-12',
  '2014-04-13',
  '2014-04-19',
  '2014-04-20',
  '2014-04-26',
  '2014-04-27',
  '2014-05-10',
  '2014-05-11',
  '2014-05-17',
  '2014-05-18',
  '2014-05-24',
  '2014-05-25',
  '2014-06-07',
  '2014-06-08',
  '2014-06-14',
  '2014-06-15',
  '2014-06-21',
  '2014-06-22',
  '2014-06-28',
  '2014-06-29',
  '2014-07-05',
  '2014-07-06',
  '2014-07-12',
  '2014-07-13',
  '2014-07-19',
  '2014-07-20',
  '2014-07-26',
  '2014-07-27',
  '2014-08-02',
  '2014-08-03',
  '2014-08-09',
  '2014-08-10',
  '2014-08-16',
  '2014-08-17',
  '2014-08-23',
  '2014-08-24',
  '2014-08-30',
  '2014-08-31',
  '2014-09-13',
  '2014-09-14',
  '2014-09-20',
  '2014-09-21',
  '2014-09-27',
  '2014-10-12',
  '2014-10-18',
  '2014-10-19',
  '2014-10-25',
  '2014-10-26',
  '2014-11-01',
  '2014-11-02',
  '2014-11-08',
  '2014-11-09',
  '2014-11-15',
  '2014-11-16',
  '2014-11-22',
  '2014-11-23',
  '2014-11-29',
  '2014-11-30',
  '2014-12-06',
  '2014-12-07',
  '2014-12-13',
  '2014-12-14',
  '2014-12-20',
  '2014-12-21',
  '2014-12-27',
  '2014-12-28',
  '2015-01-10',
  '2015-01-11',
  '2015-01-17',
  '2015-01-18',
  '2015-01-24',
  '2015-01-25',
  '2015-01-31',
  '2015-02-01',
  '2015-02-07',
  '2015-02-08',
  '2015-02-14',
  '2015-03-01',
  '2015-03-07',
  '2015-03-08',
  '2015-03-14',
  '2015-03-15',
  '2015-03-21',
  '2015-03-22',
  '2015-03-28',
  '2015-03-29',
  '2015-04-11',
  '2015-04-12',
  '2015-04-18',
  '2015-04-19',
  '2015-04-25',
  '2015-04-26',
  '2015-05-09',
  '2015-05-10',
  '2015-05-16',
  '2015-05-17',
  '2015-05-23',
  '2015-05-24',
  '2015-05-30',
  '2015-05-31',
  '2015-06-06',
  '2015-06-07',
  '2015-06-13',
  '2015-06-14',
  '2015-06-27',
  '2015-06-28',
  '2015-07-04',
  '2015-07-05',
  '2015-07-11',
  '2015-07-12',
  '2015-07-18',
  '2015-07-19',
  '2015-07-25',
  '2015-07-26',
  '2015-08-01',
  '2015-08-02',
  '2015-08-08',
  '2015-08-09',
  '2015-08-15',
  '2015-08-16',
  '2015-08-22',
  '2015-08-23',
  '2015-08-29',
  '2015-08-30',
  '2015-09-04',
  '2015-09-05',
  '2015-09-12',
  '2015-09-13',
  '2015-09-19',
  '2015-09-20',
  '2015-10-11',
  '2015-10-17',
  '2015-10-18',
  '2015-10-24',
  '2015-10-25',
  '2015-10-31',
  '2015-11-01',
  '2015-11-07',
  '2015-11-08',
  '2015-11-14',
  '2015-11-15',
  '2015-11-21',
  '2015-11-22',
  '2015-11-28',
  '2015-11-29',
  '2015-12-05',
  '2015-12-06',
  '2015-12-12',
  '2015-12-13',
  '2015-12-19',
  '2015-12-20',
  '2015-12-26',
  '2015-12-27',
  '2016-01-09',
  '2016-01-10',
  '2016-01-16',
  '2016-01-17',
  '2016-01-23',
  '2016-01-24',
  '2016-01-30',
  '2016-01-31',
  '2016-02-20',
  '2016-02-21',
  '2016-02-27',
  '2016-02-28',
  '2016-03-05',
  '2016-03-06',
  '2016-03-12',
  '2016-03-13',
  '2016-03-19',
  '2016-03-20',
  '2016-03-26',
  '2016-03-27',
  '2016-04-09',
  '2016-04-10',
  '2016-04-16',
  '2016-04-17',
  '2016-04-23',
  '2016-04-24',
  '2016-05-07',
  '2016-05-08',
  '2016-05-14',
  '2016-05-15',
  '2016-05-21',
  '2016-05-22',
  '2016-05-28',
  '2016-05-29',
  '2016-06-04',
  '2016-06-05',
  '2016-06-18',
  '2016-06-19',
  '2016-06-25',
  '2016-06-26',
  '2016-07-02',
  '2016-07-03',
  '2016-07-09',
  '2016-07-10',
  '2016-07-16',
  '2016-07-17',
  '2016-07-23',
  '2016-07-24',
  '2016-07-30',
  '2016-07-31',
  '2016-08-06',
  '2016-08-07',
  '2016-08-13',
  '2016-08-14',
  '2016-08-20',
  '2016-08-21',
  '2016-08-27',
  '2016-08-28',
  '2016-09-03',
  '2016-09-04',
  '2016-09-10',
  '2016-09-11',
  '2016-09-24',
  '2016-09-25',
  '2016-10-15',
  '2016-10-16',
  '2016-10-22',
  '2016-10-23',
  '2016-10-29',
  '2016-10-30',
  '2016-11-05',
  '2016-11-06',
  '2016-11-12',
  '2016-11-13',
  '2016-11-19',
  '2016-11-20',
  '2016-11-26',
  '2016-11-27',
  '2016-12-03',
  '2016-12-04',
  '2016-12-10',
  '2016-12-11',
  '2016-12-17',
  '2016-12-18',
  '2016-12-24',
  '2016-12-25',
  '2017-01-07',
  '2017-01-08',
  '2017-01-14',
  '2017-01-15',
  '2017-01-21',
  '2017-02-05',
  '2017-02-11',
  '2017-02-12',
  '2017-02-18',
  '2017-02-19',
  '2017-02-25',
  '2017-02-26',
  '2017-03-04',
  '2017-03-05',
  '2017-03-11',
  '2017-03-12',
  '2017-03-18',
  '2017-03-19',
  '2017-03-25',
  '2017-03-26',
  '2017-04-08',
  '2017-04-09',
  '2017-04-15',
  '2017-04-16',
  '2017-04-22',
  '2017-04-23',
  '2017-05-06',
  '2017-05-07',
  '2017-05-13',
  '2017-05-14',
  '2017-05-20',
  '2017-05-21',
  '2017-06-03',
  '2017-06-04',
  '2017-06-10',
  '2017-06-11',
  '2017-06-17',
  '2017-06-18',
  '2017-06-24',
  '2017-06-25',
  '2017-07-01',
  '2017-07-02',
  '2017-07-08',
  '2017-07-09',
  '2017-07-15',
  '2017-07-16',
  '2017-07-22',
  '2017-07-23',
  '2017-07-29',
  '2017-07-30',
  '2017-08-05',
  '2017-08-06',
  '2017-08-12',
  '2017-08-13',
  '2017-08-19',
  '2017-08-20',
  '2017-08-26',
  '2017-08-27',
  '2017-09-02',
  '2017-09-03',
  '2017-09-09',
  '2017-09-10',
  '2017-09-16',
  '2017-09-17',
  '2017-09-23',
  '2017-09-24',
  '2017-10-14',
  '2017-10-15',
  '2017-10-21',
  '2017-10-22',
  '2017-10-28',
  '2017-10-29',
  '2017-11-04',
  '2017-11-05',
  '2017-11-11',
  '2017-11-12',
  '2017-11-18',
  '2017-11-19',
  '2017-11-25',
  '2017-11-26',
  '2017-12-02',
  '2017-12-03',
  '2017-12-09',
  '2017-12-10',
  '2017-12-16',
  '2017-12-17',
  '2017-12-23',
  '2017-12-24',
  '2018-01-06',
  '2018-01-07',
  '2018-01-13',
  '2018-01-14',
  '2018-01-20',
  '2018-01-21',
  '2018-01-27',
  '2018-01-28',
  '2018-02-03',
  '2018-02-04',
  '2018-02-10',
  '2018-02-25',
  '2018-03-03',
  '2018-03-04',
  '2018-03-10',
  '2018-03-11',
  '2018-03-17',
  '2018-03-18',
  '2018-03-24',
  '2018-03-25',
  '2018-03-31',
  '2018-04-01',
  '2018-04-14',
  '2018-04-15',
  '2018-04-21',
  '2018-04-22',
  '2018-05-05',
  '2018-05-06',
  '2018-05-12',
  '2018-05-13',
  '2018-05-19',
  '2018-05-20',
  '2018-05-26',
  '2018-05-27',
  '2018-06-02',
  '2018-06-03',
  '2018-06-09',
  '2018-06-10',
  '2018-06-23',
  '2018-06-24',
  '2018-06-30',
  '2018-07-01',
  '2018-07-07',
  '2018-07-08',
  '2018-07-14',
  '2018-07-15',
  '2018-07-21',
  '2018-07-22',
  '2018-07-28',
  '2018-07-29',
  '2018-08-04',
  '2018-08-05',
  '2018-08-11',
  '2018-08-12',
  '2018-08-18',
  '2018-08-19',
  '2018-08-25',
  '2018-08-26',
  '2018-09-01',
  '2018-09-02',
  '2018-09-08',
  '2018-09-09',
  '2018-09-15',
  '2018-09-16',
  '2018-10-13',
  '2018-10-14',
  '2018-10-20',
  '2018-10-21',
  '2018-10-27',
  '2018-10-28',
  '2018-11-03',
  '2018-11-04',
  '2018-11-10',
  '2018-11-11',
  '2018-11-17',
  '2018-11-18',
  '2018-11-24',
  '2018-11-25',
  '2018-12-01',
  '2018-12-02',
  '2018-12-08',
  '2018-12-09',
  '2018-12-15',
  '2018-12-16',
  '2018-12-22',
  '2018-12-23',
  '2018-12-30',
  '2019-01-05',
  '2019-01-06',
  '2019-01-12',
  '2019-01-13',
  '2019-01-19',
  '2019-01-20',
  '2019-01-26',
  '2019-01-27',
  '2019-02-16',
  '2019-02-17',
  '2019-02-23',
  '2019-02-24',
  '2019-03-02',
  '2019-03-03',
  '2019-03-09',
  '2019-03-10',
  '2019-03-16',
  '2019-03-17',
  '2019-03-23',
  '2019-03-24',
  '2019-03-30',
  '2019-03-31',
  '2019-04-06',
  '2019-04-07',
  '2019-04-13',
  '2019-04-14',
  '2019-04-20',
  '2019-04-21',
  '2019-04-27',
  '2019-05-11',
  '2019-05-12',
  '2019-05-18',
  '2019-05-19',
  '2019-05-25',
  '2019-05-26',
  '2019-06-01',
  '2019-06-02',
  '2019-06-08',
  '2019-06-09',
  '2019-06-15',
  '2019-06-16',
  '2019-06-22',
  '2019-06-23',
  '2019-06-29',
  '2019-06-30',
  '2019-07-06',
  '2019-07-07',
  '2019-07-13',
  '2019-07-14',
  '2019-07-20',
  '2019-07-21',
  '2019-07-27',
  '2019-07-28',
  '2019-08-03',
  '2019-08-04',
  '2019-08-10',
  '2019-08-11',
  '2019-08-17',
  '2019-08-18',
  '2019-08-24',
  '2019-08-25',
  '2019-08-31',
  '2019-09-01',
  '2019-09-07',
  '2019-09-08',
  '2019-09-14',
  '2019-09-15',
  '2019-09-21',
  '2019-09-22',
  '2019-09-28',
  '2019-10-13',
  '2019-10-19',
  '2019-10-20',
  '2019-10-26',
  '2019-10-27',
  '2019-11-02',
  '2019-11-03',
  '2019-11-09',
  '2019-11-10',
  '2019-11-16',
  '2019-11-17',
  '2019-11-23',
  '2019-11-24',
  '2019-11-30',
  '2019-12-01',
  '2019-12-07',
  '2019-12-08',
  '2019-12-14',
  '2019-12-15',
  '2019-12-21',
  '2019-12-22',
  '2019-12-28',
  '2019-12-29',
  '2020-01-04',
  '2020-01-05',
  '2020-01-11',
  '2020-01-12',
  '2020-01-18',
  '2020-02-08',
  '2020-02-09',
  '2020-02-15',
  '2020-02-16',
  '2020-02-22',
  '2020-02-23',
  '2020-02-29',
  '2020-03-01',
  '2020-03-07',
  '2020-03-08',
  '2020-03-14',
  '2020-03-15',
  '2020-03-21',
  '2020-03-22',
  '2020-03-28',
  '2020-03-29',
  '2020-04-11',
  '2020-04-12',
  '2020-04-18',
  '2020-04-19',
  '2020-04-25',
  '2020-05-10',
  '2020-05-16',
  '2020-05-17',
  '2020-05-23',
  '2020-05-24',
  '2020-05-30',
  '2020-05-31',
  '2020-06-06',
  '2020-06-07',
  '2020-06-13',
  '2020-06-14',
  '2020-06-20',
  '2020-06-21',
  '2020-07-04',
  '2020-07-05',
  '2020-07-11',
  '2020-07-12',
  '2020-07-18',
  '2020-07-19',
  '2020-07-25',
  '2020-07-26',
  '2020-08-01',
  '2020-08-02',
  '2020-08-08',
  '2020-08-09',
  '2020-08-15',
  '2020-08-16',
  '2020-08-22',
  '2020-08-23',
  '2020-08-29',
  '2020-08-30',
  '2020-09-05',
  '2020-09-06',
  '2020-09-12',
  '2020-09-13',
  '2020-09-19',
  '2020-09-20',
  '2020-09-26',
  '2020-10-11',
  '2020-10-17',
  '2020-10-18',
  '2020-10-24',
  '2020-10-25',
  '2020-10-31',
  '2020-11-01',
  '2020-11-07',
  '2020-11-08',
  '2020-11-14',
  '2020-11-15',
  '2020-11-21',
  '2020-11-22',
  '2020-11-28',
  '2020-11-29',
  '2020-12-05',
  '2020-12-06',
  '2020-12-12',
  '2020-12-13',
  '2020-12-19',
  '2020-12-20',
  '2020-12-26',
  '2020-12-27',
  '2021-01-09',
  '2021-01-10',
  '2021-01-16',
  '2021-01-17',
  '2021-01-23',
  '2021-01-24',
  '2021-01-30',
  '2021-01-31',
  '2021-02-06',
  '2021-02-21',
  '2021-02-27',
  '2021-02-28',
  '2021-03-06',
  '2021-03-07',
  '2021-03-13',
  '2021-03-14',
  '2021-03-20',
  '2021-03-21',
  '2021-03-27',
  '2021-03-28',
  '2021-04-10',
  '2021-04-11',
  '2021-04-17',
  '2021-04-18',
  '2021-04-24',
  '2021-05-09',
  '2021-05-15',
  '2021-05-16',
  '2021-05-22',
  '2021-05-23',
  '2021-05-29',
  '2021-05-30',
  '2021-06-05',
  '2021-06-06',
  '2021-06-19',
  '2021-06-20',
  '2021-06-26',
  '2021-06-27',
  '2021-07-03',
  '2021-07-04',
  '2021-07-10',
  '2021-07-11',
  '2021-07-17',
  '2021-07-18',
  '2021-07-24',
  '2021-07-25',
  '2021-07-31',
  '2021-08-01',
  '2021-08-07',
  '2021-08-08',
  '2021-08-14',
  '2021-08-15',
  '2021-08-21',
  '2021-08-22',
  '2021-08-28',
  '2021-08-29',
  '2021-09-04',
  '2021-09-05',
  '2021-09-11',
  '2021-09-12',
  '2021-09-25',
  '2021-10-10',
  '2021-10-16',
  '2021-10-17',
  '2021-10-23',
  '2021-10-24',
  '2021-10-30',
  '2021-10-31',
  '2021-11-06',
  '2021-11-07',
  '2021-11-13',
  '2021-11-14',
  '2021-11-20',
  '2021-11-21',
  '2021-11-27',
  '2021-11-28',
  '2021-12-04',
  '2021-12-05',
  '2021-12-11',
  '2021-12-12',
  '2021-12-18',
  '2021-12-19',
  '2021-12-25',
  '2021-12-26',
  '2022-01-08',
  '2022-01-09',
  '2022-01-15',
  '2022-01-16',
  '2022-01-22',
  '2022-01-23',
  '2022-02-12',
  '2022-02-13',
  '2022-02-19',
  '2022-02-20',
  '2022-02-26',
  '2022-02-27',
  '2022-03-05',
  '2022-03-06',
  '2022-03-12',
  '2022-03-13',
  '2022-03-19',
  '2022-03-20',
  '2022-03-26',
  '2022-03-27',
  '2022-04-09',
  '2022-04-10',
  '2022-04-16',
  '2022-04-17',
  '2022-04-23',
  '2022-05-08',
  '2022-05-14',
  '2022-05-15',
  '2022-05-21',
  '2022-05-22',
  '2022-05-28',
  '2022-05-29',
  '2022-06-11',
  '2022-06-12',
  '2022-06-18',
  '2022-06-19',
  '2022-06-25',
  '2022-06-26',
  '2022-07-02',
  '2022-07-03',
  '2022-07-09',
  '2022-07-10',
  '2022-07-16',
  '2022-07-17',
  '2022-07-23',
  '2022-07-24',
  '2022-07-30',
  '2022-07-31',
  '2022-08-06',
  '2022-08-07',
  '2022-08-13',
  '2022-08-14',
  '2022-08-20',
  '2022-08-21',
  '2022-08-27',
  '2022-08-28',
  '2022-09-03',
  '2022-09-04',
  '2022-09-17',
  '2022-09-18',
  '2022-09-24',
  '2022-09-25',
  '2022-10-15',
  '2022-10-16',
  '2022-10-22',
  '2022-10-23',
  '2022-10-29',
  '2022-10-30',
  '2022-11-05',
  '2022-11-06',
  '2022-11-12',
  '2022-11-13',
  '2022-11-19',
  '2022-11-20',
  '2022-11-26',
  '2022-11-27',
  '2022-12-03',
  '2022-12-04',
  '2022-12-10',
  '2022-12-11',
  '2022-12-17',
  '2022-12-18',
  '2022-12-24',
  '2022-12-25',
  '2023-01-07',
  '2023-01-08',
  '2023-01-14',
  '2023-01-15',
  '2023-02-04',
  '2023-02-05',
  '2023-02-11',
  '2023-02-12',
  '2023-02-18',
  '2023-02-19',
  '2023-02-25',
  '2023-02-26',
  '2023-03-04',
  '2023-03-05',
  '2023-03-11',
  '2023-03-12',
  '2023-03-18',
  '2023-03-19',
  '2023-03-25',
  '2023-03-26',
  '2023-04-01',
  '2023-04-02',
  '2023-04-08',
  '2023-04-09',
  '2023-04-15',
  '2023-04-16',
  '2023-04-22',
  '2023-05-07',
  '2023-05-13',
  '2023-05-14',
  '2023-05-20',
  '2023-05-21',
  '2023-05-27',
  '2023-05-28',
  '2023-06-03',
  '2023-06-04',
  '2023-06-10',
  '2023-06-11',
  '2023-06-17',
  '2023-06-18',
  '2023-07-01',
  '2023-07-02',
  '2023-07-08',
  '2023-07-09',
  '2023-07-15',
  '2023-07-16',
  '2023-07-22',
  '2023-07-23',
  '2023-07-29',
  '2023-07-30',
  '2023-08-05',
  '2023-08-06',
  '2023-08-12',
  '2023-08-13',
  '2023-08-19',
  '2023-08-20',
  '2023-08-26',
  '2023-08-27',
  '2023-09-02',
  '2023-09-03',
  '2023-09-09',
  '2023-09-10',
  '2023-09-16',
  '2023-09-17',
  '2023-09-23',
  '2023-09-24',
  '2023-10-14',
  '2023-10-15',
  '2023-10-21',
  '2023-10-22',
  '2023-10-28',
  '2023-10-29',
  '2023-11-04',
  '2023-11-05',
  '2023-11-11',
  '2023-11-12',
  '2023-11-18',
  '2023-11-19',
  '2023-11-25',
  '2023-11-26',
  '2023-12-02',
  '2023-12-03',
  '2023-12-09',
  '2023-12-10',
  '2023-12-16',
  '2023-12-17',
  '2023-12-23',
  '2023-12-24',
  '2023-12-30',
  '2023-12-31',
]);

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function isHoliday(date: string) {
  return HOLIDAYS.has(date);
}

export function isWorkday(date: string) {
  return !HOLIDAYS.has(date);
}

export const dateUtil = dayjs;
