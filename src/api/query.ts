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
  LOGIN_BY_SESSION: gql`
    mutation loginBySession {
      loginBySession {
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

// 注意wallpaer,自己收集图片然后随机生成
export const TOOL_API = {
  VERIFY_CODE: gql`
    query getCaptcha {
      captcha {
        text
        img
      }
    }
  `,
  WALL_PAPER: gql`
    query getWallPaper {
      wallPaper
    }
  `,
  COORD: gql`
    query getCoord($search: String!) {
      coord(search: $search) {
        location
        name
        cityCode
      }
    }
  `,
  WEATHER: gql`
    query getWeather($city: String!) {
      weather(city: $city) {
        temperature
        weather
        city
      }
    }
  `,
  UPLOAD_IMG: gql`
    mutation upload($file: Upload!) {
      singleUpload(file: $file) {
        url
      }
    }
  `,
  IMG_COORD: gql`
    query getImgByCoord($location: String!) {
      imgByCoord(location: $location)
    }
  `,
};

export const ARTICLE_API = {
  KIND: gql`
    query getKind {
      kind {
        kindName
        id
      }
    }
  `,
  CREATE_ARTICLE: gql`
    mutation createArticle($data: CreateArticleData!) {
      createArticle(data: $data) {
        articleId
      }
    }
  `,
};
export interface ArticleApiData {
  kind: {
    kind: {
      kindName: string;
      id: string;
    }[];
  };
}
export interface ToolApiData {
  verifyCode: {
    captcha: { text: string; img: string };
  };
}
