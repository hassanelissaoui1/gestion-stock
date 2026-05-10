const originalFetch = window.fetch;

window.fetch = function(url, options) {
  let newOptions = options || {};
  let headers = newOptions.headers || {};

  try {
    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    if (utilisateurConnecte && utilisateurConnecte.id && typeof url === "string") {
      if (url.includes("/api/") && !url.includes("/api/auth/login")) {
        headers = {
          ...headers,
          "X-Utilisateur-Id": utilisateurConnecte.id
        };

        newOptions = {
          ...newOptions,
          headers: headers
        };
      }
    }
  } catch (error) {
  }

  return originalFetch(url, newOptions);
};
