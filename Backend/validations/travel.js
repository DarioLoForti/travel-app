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
};
