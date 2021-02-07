// gql查询语句
import { gql } from '@apollo/client';

export const USER_API = {
  USER_DATA: gql`
    query user($id: ID!) {
      user(id: $id) {
        username
      }
    }
  `,
};

export const TOOL_API = {
  VERIFY_CODE: gql`
    query getCaptcha {
      captcha {
        text
        img
      }
    }
  `,
};

export interface ToolApiData {
  verifyCode: {
    captcha: { text: string; img: string };
  };
}
