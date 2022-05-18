export function getScore(username, cb) {
  fetch(`/score?username=${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      cb(result);
    })
    .catch(() => {});
}

export function putScore(username, score) {
  fetch(`/score?username=${username}&score=${score}`, {
    method: "PUT",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
}

export function login(username, cb, cb2) {
  fetch(`/login?username=${username}`, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        cb();
      }
    })
    .catch(() => {
      cb2();
    });
}

export function question(limit, cb) {
  fetch(`/question?limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      cb(result);
    })
    .catch(() => {});
}

export function deleteAccount(username, cb) {
  fetch(`/user?username=${username}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        cb();
      }
    })
    .catch(() => {});
}
