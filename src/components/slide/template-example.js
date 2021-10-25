const templateExample = [
  {
    "input": "header",
    "text": "Skabelon: Tekst og billede",
    "name": "header1",
    "formGroupClasses": "h4 mb-3"
  },
  {
    "input": "header-h3",
    "text": "Indhold",
    "name": "header2",
    "formGroupClasses": "h5 mb-3"
  },
  {
    "input": "textarea",
    "name": "text",
    "type": "text",
    "label": "Tekst på slide",
    "helpText": "Her kan du skrive teksten til slidet",
    "formGroupClasses": "col-md-6"
  },
  {
    "input": "image",
    "name": "image",
    "label": "Billede"
  },
  {
    "input": "image",
    "name": "image2",
    "label": "Billede 2"
  },
  {
    "input": "header-h3",
    "text": "Opsætning",
    "name": "header3",
    "formGroupClasses": "h5 mb-3"
  },
  {
    "input": "input",
    "name": "duration",
    "type": "number",
    "label": "Varighed (i millisekunder)",
    "helpText": "Her skal du skrive varigheden på slidet.",
    "required": true,
    "formGroupClasses": "col-md-6 mb-3"
  },
  {
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
    "input": "checkbox",
    "label": "Margin rundt om tekst",
    "name": "text-margin",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Animeret tekst under overskrift",
    "name": "seperator",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Teksten optager højest 50% af skærmen",
    "name": "half_size",
    "formGroupClasses": "col-lg-3 mb-3"
  },
  {
    "input": "checkbox",
    "label": "Overskriften er under teksten",
    "helpText": "Denne kan ikke kombineres med den animerede tekst under overskriften",
    "name": "reversed",
    "formGroupClasses": "col-lg-3"
  }
];

export default templateExample;
