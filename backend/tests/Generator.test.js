const controller = require('../controllers/Generator');

describe('generateOutfits', () => {
    it('returns a response object with text and image urls', async () => {
      const user_email = 'test@test.test';
      const weatherValues = {
        tempC: 20,
        condition: 'sunny',
      };
      const colorScheme = 'blue';
  
      const result = await controller.generateOutfits(user_email, weatherValues, colorScheme);
  
      expect(result.responseText).toBeDefined();
      expect(result.imageUrls).toHaveLength(3);
      expect(result.imageUrls[0]).toContain('http');
      expect(result.imageUrls[1]).toContain('http');
      expect(result.imageUrls[2]).toContain('http');
    }, 200000); // set timeout to 10 seconds
  });
  

describe('getUserWardrobe', () => {
  it('returns clothing items grouped by category', async () => {
    const user_email = 'test@test.test';

    const result = await controller.getUserWardrobe(user_email);

    expect(result).toBeDefined();
    expect(result['TOPS']).toBeDefined();
    expect(result['BOTTOMS']).toBeDefined();
    expect(result['SHOES']).toBeDefined();
  });
});

describe('getUserData', () => {
  it('returns user data for a given email', async () => {
    const user_email = 'test@test.test';

    const result = await controller.getUserData(user_email);

    expect(result).toBeDefined();
    expect(result).toContain('with a');
    expect(result).toContain('skin tone');
  });
});
