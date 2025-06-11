const getPrompts = () => {
  const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
  return prompts
}

export default getPrompts
