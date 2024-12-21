import { StyleManagerConfig } from "grapesjs";

export default {
  sectors: [{
    name: "General",
    properties: [{
      extend: "float",
      type: "radio",
      default: "none",
      options: [{
        value: "none",
        className: "fa fa-times"
      }, {
        value: "left",
        className: "fa fa-align-left"
      }, {
        value: "right",
        className: "fa fa-align-right"
      }]
    }, "display", {
      extend: "position",
      type: "select"
    }, "top", "right", "left", "bottom"]
  }, {
    name: "Dimension",
    open: !1,
    properties: ["width", {
      id: "flex-width",
      type: "integer",
      name: "Width",
      units: ["px", "%"],
      property: "flex-basis",
      toRequire: 1
    }, "height", "max-width", "min-height", "margin", "padding"]
  }, {
    name: "Typography",
    open: !1,
    properties: ["font-family", "font-size", "font-weight", "letter-spacing", "color", "line-height", {
      extend: "text-align",
      options: [{
        id: "left",
        label: "Left",
        className: "fa fa-align-left"
      }, {
        id: "center",
        label: "Center",
        className: "fa fa-align-center"
      }, {
        id: "right",
        label: "Right",
        className: "fa fa-align-right"
      }, {
        id: "justify",
        label: "Justify",
        className: "fa fa-align-justify"
      }]
    }, {
        property: "text-decoration",
        type: "radio",
        default: "none",
        options: [{
          id: "none",
          label: "None",
          className: "fa fa-times"
        }, {
          id: "underline",
          label: "underline",
          className: "fa fa-underline"
        }, {
          id: "line-through",
          label: "Line-through",
          className: "fa fa-strikethrough"
        }]
      }, "text-shadow"]
  }, {
    name: "Decorations",
    open: !1,
    properties: ["opacity", "border-radius", "border", "box-shadow", "background"]
  }, {
    name: "Extra",
    open: !1,
    buildProps: ["transition", "perspective", "transform"]
  }, {
    name: "Flex",
    open: !1,
    properties: [{
      name: "Flex Container",
      property: "display",
      type: "select",
      defaults: "block",
      list: [{
        value: "block",
        name: "Disable"
      }, {
        value: "flex",
        name: "Enable"
      }]
    }, {
      name: "Flex Parent",
      property: "label-parent-flex",
      type: "integer"
    }, {
      name: "Direction",
      property: "flex-direction",
      type: "radio",
      defaults: "row",
      list: [{
        value: "row",
        name: "Row",
        className: "icons-flex icon-dir-row",
        title: "Row"
      }, {
        value: "row-reverse",
        name: "Row reverse",
        className: "icons-flex icon-dir-row-rev",
        title: "Row reverse"
      }, {
        value: "column",
        name: "Column",
        title: "Column",
        className: "icons-flex icon-dir-col"
      }, {
        value: "column-reverse",
        name: "Column reverse",
        title: "Column reverse",
        className: "icons-flex icon-dir-col-rev"
      }]
    }, {
      name: "Justify",
      property: "justify-content",
      type: "radio",
      defaults: "flex-start",
      list: [{
        value: "flex-start",
        className: "icons-flex icon-just-start",
        title: "Start"
      }, {
        value: "flex-end",
        title: "End",
        className: "icons-flex icon-just-end"
      }, {
        value: "space-between",
        title: "Space between",
        className: "icons-flex icon-just-sp-bet"
      }, {
        value: "space-around",
        title: "Space around",
        className: "icons-flex icon-just-sp-ar"
      }, {
        value: "center",
        title: "Center",
        className: "icons-flex icon-just-sp-cent"
      }]
    }, {
      name: "Align",
      property: "align-items",
      type: "radio",
      defaults: "center",
      list: [{
        value: "flex-start",
        title: "Start",
        className: "icons-flex icon-al-start"
      }, {
        value: "flex-end",
        title: "End",
        className: "icons-flex icon-al-end"
      }, {
        value: "stretch",
        title: "Stretch",
        className: "icons-flex icon-al-str"
      }, {
        value: "center",
        title: "Center",
        className: "icons-flex icon-al-center"
      }]
    }, {
      name: "Flex Children",
      property: "label-parent-flex",
      type: "integer"
    }, {
      name: "Order",
      property: "order",
      type: "integer",
      defaults: 0,
      min: 0
    }, {
      name: "Flex",
      property: "flex",
      type: "composite",
      properties: [{
        name: "Grow",
        property: "flex-grow",
        type: "integer",
        defaults: 0,
        min: 0
      }, {
        name: "Shrink",
        property: "flex-shrink",
        type: "integer",
        defaults: 0,
        min: 0
      }, {
        name: "Basis",
        property: "flex-basis",
        type: "integer",
        units: ["px", "%", ""],
        unit: "",
        defaults: "auto"
      }]
    }, {
      name: "Align",
      property: "align-self",
      type: "radio",
      defaults: "auto",
      list: [{
        value: "auto",
        name: "Auto"
      }, {
        value: "flex-start",
        title: "Start",
        className: "icons-flex icon-al-start"
      }, {
        value: "flex-end",
        title: "End",
        className: "icons-flex icon-al-end"
      }, {
        value: "stretch",
        title: "Stretch",
        className: "icons-flex icon-al-str"
      }, {
        value: "center",
        title: "Center",
        className: "icons-flex icon-al-center"
      }]
    }]
  }]
} as StyleManagerConfig;