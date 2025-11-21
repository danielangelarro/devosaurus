export const FormActions = {
  fillMagic: () => () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((el: any) => {
      if (el.type === 'hidden' || el.disabled) return;
      
      const randomId = Math.floor(Math.random() * 1000);
      
      if (el.type === 'email' || el.name.includes('email')) {
        el.value = `test.devosaurus.${randomId}@example.com`;
      } else if (el.type === 'password') {
        el.value = 'Password123!';
      } else if (el.type === 'tel') {
        el.value = '555-0123';
      } else if (el.type === 'date') {
        el.value = new Date().toISOString().split('T')[0];
      } else if (el.type === 'checkbox') {
        el.checked = !el.checked;
      } else {
        el.value = `Test Data ${randomId}`;
      }
      
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    console.log('🦖 Formulario rellenado mágicamente.');
  },

  fillField: (selector: string, type: 'email' | 'name' | 'phone' | 'lorem') => () => {
    const el = document.querySelector(selector) as HTMLInputElement;
    if (!el) return;

    const random = Math.floor(Math.random() * 9999);
    let value = '';

    switch (type) {
      case 'email': value = `user.${random}@test.com`; break;
      case 'name': value = `Usuario Test ${random}`; break;
      case 'phone': value = `555${random}`; break;
      case 'lorem': value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'; break;
    }

    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  },

  pickRandomOption: (selector: string) => () => {
    const select = document.querySelector(selector) as HTMLSelectElement;
    if (select && select.options.length > 0) {
      const randomIndex = Math.floor(Math.random() * select.options.length);
      select.selectedIndex = randomIndex;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
};