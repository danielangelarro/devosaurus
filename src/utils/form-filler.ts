export const autoFillForms = () => {
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((el: any) => {
    if (el.type === "hidden" || el.disabled || el.readOnly) return;

    const type = el.type;
    const name = (el.name || el.id || "").toLowerCase();

    let value: any = "Test Data";

    if (type === "email" || name.includes("email"))
      value = "devosaurus@test.com";
    else if (type === "password" || name.includes("pass"))
      value = "Password123!";
    else if (type === "tel" || name.includes("phone")) value = "555-0199";
    else if (type === "number") value = 42;
    else if (type === "checkbox") el.checked = true;
    else if (type === "date") value = new Date().toISOString().split("T")[0];

    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });

  console.log("🦖 Devosaurus: Formulario rellenado con datos de prueba.");
};
