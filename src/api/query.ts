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
  ARTICLE_ITEM: gql`
    query getArticleItems($data: ArticleItemsInput!) {
      articleItems(data: $data) {
        total
        items {
          img
          score
          author {
            headImg
            username
            userId
          }
          give
          title
          content
          label
          id
        }
      }
    }
  `,
  ARTICLE: gql`
    query getArticle($id: ID!) {
      article(id: $id) {
        createTime
        author {
          ...User
        }
        title
        content
        traffic
        comment {
          createTime
          publisher {
            ...User
          }
          comment
          commentChild {
            articleId
            lastEditTime
            commentFatherId
            img
            id
            comment
            createTime
            publisher {
              ...User
            }
          }
          articleId
          lastEditTime
          img
          id
        }
        lastEditTime
        label
        kind
        imgPath
        isGive
        giveCount
        location
        cityCode
        score
      }
    }
    fragment User on Author {
      headImg
      id
      username
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
  article: {
    article: {
      createTime: number;
      author: {
        headImg: string;
        id: string;
        username: string;
      };
      title: string;
      content: string;
      traffic: number;
      comment: {
        createTime: number;
        publisher: {
          headImg: string;
          id: string;
          username: string;
        };
        comment: string;
        commentChild: {
          articleId: string;
          lastEditTime: number;
          commentFatherId: string;
          img: string;
          id: string;
          comment: string;
          createTime: number;
          publisher: {
            headImg: string;
            id: string;
            username: string;
          };
        };
        articleId: string;
        lastEditTime: number;
        img: string;
        id: string;
      }[];
      lastEditTime: number;
      label: string[];
      kind: string;
      imgPath: string[];
      isGive: boolean;
      giveCount: number;
      location: string;
      cityCode: string;
      score: number;
    };
  };
}
export interface ToolApiData {
  verifyCode: {
    captcha: { text: string; img: string };
  };
}
