import {resolveIcon} from '../../../src/app/weather/utils';

describe('resolveIcon', () => {

    it('should return a classname from an ID', () => {
        let r = resolveIcon(200);
        expect(r).toEqual('wi wi-day-storm-showers');
    });

    it('should insert `-day` where applicable', () => {
        let r = resolveIcon(801);
        expect(r).toEqual('wi wi-day-cloudy');
    });
});
