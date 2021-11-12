export const SetToken = (token) => {
  return {
    type: "TOKEN",
    payload: token,
  };
};

export const RemoveToken = () => {
  return {
    type: "REMOVE_TOKEN"
  };
};

export const SetMontant = (montant) => {
  return {
    type: "SET_MONTANT",
    payload: montant,
  };
};

export const RemoveMontant = () => {
  return {
    type: "REMOVE_MONTANT",
  };
};


export const SetProfile = (profile) => {
  return {
    type: "SET_PROFILE",
    payload: profile,
  };
};

export const RemoveProfile = () => {
  return {
    type: "REMOVE_PROFILE",
  };
};

export const setMotif = (motif) => {
  return {
    type: "SET_MOTIF",
    payload: motif,
  };
};

export const removeMotif = () => {
  return {
    type: "REMOVE_MOTIF",
  };
};