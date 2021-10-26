const templateExample = [
  {
    "key": "image-text-form-1",
    "input": "header",
    "text": "Skabelon: Tekst og billede",
    "name": "header1",
    "formGroupClasses": "h4 mb-3"
  },
  {
    "key": "image-text-form-2",
    "input": "header-h3",
    "text": "Indhold",
    "name": "header2",
    "formGroupClasses": "h5 mb-3"
  },
  {
    "key": "image-text-form-3",
    "input": "textarea",
    "name": "text",
    "type": "text",
    "label": "Tekst på slide",
    "helpText": "Her kan du skrive teksten til slidet",
    "formGroupClasses": "col-md-6"
  },
  // @TODO: Handle image.
  /*
  {
    "key": "image-text-form-4",
    "input": "image",
    "name": "image",
    "label": "Billede"
  },
   */
  {
    "key": "image-text-form-5",
    "input": "header-h3",
    "text": "Opsætning",
    "name": "header3",
    "formGroupClasses": "h5 mt-3 mb-3"
  },
  {
    "key": "image-text-form-6",
    "input": "input",
    "name": "duration",
    "type": "number",
    "label": "Varighed (i millisekunder)",
    "helpText": "Her skal du skrive varigheden på slidet.",
    "required": true,
    "formGroupClasses": "col-md-6 mb-3"
  },
  {
    "key": "image-text-form-7",
    "input": "select",
    "required": true,
    "label": "Hvor skal tekstboksen være placeret",
    "formGroupClasses": "col-md-6 mb-3",
    "options": [
      {
        "key": "placement1",
        "title": "Toppen",
        "value": "top"
      },
      {
        "key": "placement2",
        "title": "Højre",
        "value": "right"
      },
      {
        "key": "placement3",
        "title": "Bunden",
        "value": "bottom"
      },
      {
        "key": "placement4",
        "title": "Venstre",
        "value": "left"
      }
    ],
    "name": "box-align"
  },
  {
    "key": "image-text-form-8",
    "input": "checkbox",
    "label": "Margin rundt om tekst",
    "name": "text-margin",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "key": "image-text-form-9",
    "input": "checkbox",
    "label": "Animeret tekst under overskrift",
    "name": "seperator",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "key": "image-text-form-10",
    "input": "checkbox",
    "label": "Teksten optager højest 50% af skærmen",
    "name": "half_size",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "key": "image-text-form-11",
    "input": "checkbox",
    "label": "Overskriften er under teksten",
    "helpText": "Denne kan ikke kombineres med den animerede tekst under overskriften",
    "name": "reversed",
    "formGroupClasses": "col-lg-3"
  }
];

export default templateExample;
