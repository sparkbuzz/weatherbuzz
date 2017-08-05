import {toHour12} from '../../../src/app/time/utils';

describe('to12', () => {
    it('should convert 24-hour time to 12-hour format', () => {
        // In the AM
        expect(toHour12('1970-01-01 01:00:00')).toEqual('1am');
        expect(toHour12('1970-01-01 11:00:00')).toEqual('11am');

        // In the PM
        expect(toHour12('1970-01-01 13:00:00')).toEqual('1pm');
        expect(toHour12('1970-01-01 23:00:00')).toEqual('11pm');
    });

    it('should deal with 12am/pm appropriately', () => {
        expect(toHour12('1970-01-01 00:00:00')).toEqual('12am');
        expect(toHour12('1970-01-01 12:00:00')).toEqual('12pm');
    });
});
