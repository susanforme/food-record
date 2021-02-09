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
  LOGIN: gql`
    mutation login($data: LoginData!) {
      login(data: $data) {
        username
        id
        headImg
        createTime
        location
        email
      }
    }
  `,
  REGISTER: gql`
    mutation register($data: RegisterData!) {
      register(data: $data) {
        username
        id
        headImg
        createTime
        location
        email
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
