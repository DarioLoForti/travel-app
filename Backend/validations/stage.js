const bodyData = {
  title: {
    notEmpty: {
      errorMessage: "Il titolo è obbligatorio",
      bail: true,
    },
    isString: {
      errorMessage: "Il titolo deve essere una stringa",
      bail: true,
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Il titolo deve essere lungo almeno 3 caratteri",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "La descrizione è obbligatoria",
      bail: true,
    },
    isString: {
      errorMessage: "La descrizione deve essere una stringa",
      bail: true,
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "La descrizione deve essere lunga almeno 3 caratteri",
    },
  },
  rating: {
    notEmpty: {
      errorMessage: "Il rating è obbligatorio",
      bail: true,
    },
    isInt: {
      options: { min: 1, max: 5 },
      errorMessage: "Il rating deve essere un numero tra 1 e 5",
    },
  },

  notes: {
    optional: true,
    isString: {
      errorMessage: "Le note devono essere una stringa",
      bail: true,
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Le note devono essere lunghe almeno 3 caratteri",
    },
  },
};

module.exports = { bodyData };
