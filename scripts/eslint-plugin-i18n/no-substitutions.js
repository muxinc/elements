module.exports = {
  rules: {
    'no-substitutions': {
      create: function (context) {
        return {
          TaggedTemplateExpression(node) {
            const tag = node.tag.name;
            if (tag === 'i18n') {
              for (const expr of node.quasi.expressions) {
                context.report(expr, `No expressions allowed, use ICU Message syntax`);
              }
            }
          },
        };
      },
    },
  },
};
