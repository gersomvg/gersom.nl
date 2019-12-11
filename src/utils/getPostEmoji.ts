export default (category: string) => {
  switch (category) {
    case 'code':
      return '👨‍💻';
    case 'running':
      return '🏃‍♂️';
    case 'veganism':
      return '🌱';
    case 'lifehacks':
      return '🧬';
    case 'other':
    default:
      return '💭';
  }
};
