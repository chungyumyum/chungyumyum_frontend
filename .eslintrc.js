
module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["react", "@typescript-eslint"],
    "settings": {
      "react": {
        "version": "detect" // 사용자가 설치한 버전을 자동으로 선택
      }
    },
    "rules": {
      "react/react-in-jsx-scope":0
    }
  }