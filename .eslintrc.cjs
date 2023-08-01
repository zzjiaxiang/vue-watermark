module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    // eslint:recommended 继承所有标记为推荐的规则(https://zh-hans.eslint.org/docs/latest/rules)
    extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["vue"],
    /**
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    rules: {
        // eslint (https://zh-hans.eslint.org/docs/latest/rules/)
        "no-var": "error", // 要求使用 let 或 const 而不是 var
        "no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
        "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
        "no-irregular-whitespace": "off", // 禁止不规则的空白
        // js/ts
        camelcase: ['error', { properties: 'never' }],
        'no-console': ['off', { allow: ['error'] }], // 禁用console
        'no-debugger': 'warn',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        'no-return-await': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'prefer-const': [
            'warn',
            { destructuring: 'all', ignoreReadBeforeAssign: true },
        ],
        'prefer-arrow-callback': [
            'error',
            { allowNamedFunctions: false, allowUnboundThis: true },
        ],
        'object-shorthand': [
            'error',
            'always',
            { ignoreConstructors: false, avoidQuotes: true },
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',

        'no-redeclare': 'off',
        // best-practice
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'no-alert': 'warn',
        'no-case-declarations': 'error',
        'no-multi-str': 'error',
        'no-with': 'error',
        'no-void': 'error',

        'sort-imports': [
            'warn',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: false,
            },
        ],
        // vue (https://eslint.vuejs.org/rules)
        "vue/no-v-html": "warn", // 禁止使用 v-html
        'vue/require-explicit-emits': 'off',
        'vue/prefer-import-from-vue': 'off',
        'vue/no-v-text-v-html-on-component': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
        "vue/v-slot-style": "error", // 强制执行 v-slot 指令样式
        "vue/no-mutating-props": "off", // 不允许组件 prop的改变
        "vue/custom-event-name-casing": "off", // 为自定义事件名称强制使用特定大小写
        "vue/attributes-order": "off", // vue api使用顺序，强制执行属性顺序
        "vue/one-component-per-file": "off", // 强制每个组件都应该在自己的文件中
        "vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或禁止换行
        "vue/max-attributes-per-line": "off", // 强制每行的最大属性数
        "vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行符
        "vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行符
        "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
        "vue/require-default-prop": "off", // 此规则要求为每个 prop 为必填时，必须提供默认值
        "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    }
};
