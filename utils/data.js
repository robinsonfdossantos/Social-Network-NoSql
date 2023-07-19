const names = [
  'John',
  'Jane',
  'Michael',
  'Sarah',
  'David',
  'Emily',
  'Daniel',
  'Olivia',
  'Matthew',
  'Sophia',
  'Andrew',
  'Emma',
  'James',
  'Ava',
  'Benjamin',
  'Isabella',
  'William',
  'Mia',
  'Joseph',
  'Charlotte',
];

const getRandomName = () => {
  const firstName = names[Math.floor(Math.random() * names.length)];
  const lastName = names[Math.floor(Math.random() * names.length)];
  return `${firstName} ${lastName}`;
};

const getRandomEmail = () => {
  const domain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const username = getRandomName().toLowerCase().replace(/\s/g, '');
  const randomDomain = domain[Math.floor(Math.random() * domain.length)];
  return `${username}@${randomDomain}`;
};

const generateThoughts = (count) => {
  const thoughts = [];
  for (let i = 0; i < count; i++) {
    const thought = {
      thoughtText: `Sample thought ${i + 1}`,
      username: getRandomName(),
      reactions: [],
    };
    thoughts.push(thought);
  }
  return thoughts;
};

module.exports = { getRandomName, getRandomEmail, generateThoughts };

