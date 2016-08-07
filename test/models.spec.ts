/// <reference path="../typings/index.d.ts" />

import { Config } from './config';

describe('models', () => {
  it('should work', ()=> {
    expect(true).toEqual(true)
  })

  it('Environment variables must be defined', () => {
    expect(Config.SEED_MODE).not.toEqual(null);
  });
})
