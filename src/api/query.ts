// gql查询语句
import { gql } from '@apollo/client';

export const USER_API = {
  USER_DATA: gql`
    query getUser($userId: ID!) {
      user(id: $userId) {
        user {
          headImg
          id
          username
        }
        discuss {
          attention
          fan
        }
        article {
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
        foodTags
        commentCount
        articleCount
        comment {
          createTime
          comment
          articleId {
            content
            id
            imgPath
          }
        }
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
  LOGOUT: gql`
    mutation logout {
      logout
    }
  `,
  UPDATE_HEAD_IMG: gql`
    mutation updateHeadImg($url: String!) {
      updateHeadImg(url: $url)
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
  EMOJI: gql`
    query getEmoji {
      emoji {
        content
      }
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
  SEND_COMMENT: gql`
    mutation sendComment($data: CreateArticleCommentData!) {
      createArticleComment(data: $data)
    }
  `,
  COMMENT: gql`
    query getComment($articleId: ID!) {
      comment(articleId: $articleId) {
        createTime
        publisher {
          ...User
        }
        comment
        commentChild {
          lastEditTime
          img
          id
          comment
          createTime
          publisher {
            ...User
          }
        }
        lastEditTime
        img
        id
      }
    }
    fragment User on Author {
      headImg
      id
      username
    }
  `,
  GIVE_ARTICLE: gql`
    mutation updateArticleGive($articleId: ID!) {
      updateArticleGive(id: $articleId)
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
  comment: {
    comment: {
      createTime: number;
      publisher: {
        headImg: string;
        id: string;
        username: string;
      };
      comment: string;
      commentChild?: [
        {
          lastEditTime?: number;
          img?: string;
          id: string;
          comment: string;
          createTime: number;
          publisher: {
            headImg: string;
            id: string;
            username: string;
          };
        },
      ];
      lastEditTime?: number;
      img?: string;
      id: string;
    }[];
  };
  articleItems: {
    articleItems: {
      items: {
        author: {
          headImg: string;
          userId: string;
          username: string;
        };
        content: string;
        give: number;
        id: string;
        img: string;
        label: string[];
        score: number;
        title: string;
      }[];
      total: number;
    };
  };
}
export interface ToolApiData {
  verifyCode: {
    captcha: { text: string; img: string };
  };
  emoji: {
    emoji: {
      content: string;
    }[];
  };
}

export interface UserApiData {
  user: {
    user: {
      user: {
        id: string;
        headImg: string;
        username: string;
      };
      discuss: {
        attention: number;
        fan: number;
      };
      foodTags: string[];
      article: ArticleApiData['articleItems']['articleItems'];
      articleCount: number;
      comment: {
        createTime: number;
        comment: string;
        articleId: {
          content: string;
          id: string;
          imgPath: [string];
        };
      }[];
      commentCount: number;
    };
  };
}

export const CHAT_API = {
  MESSAGE_LIST: gql`
    query getMsgList($id: ID!) {
      messageList(id: $id) {
        user {
          username
          headImg
          id
        }
        record {
          message
          id
          createTime
          img
        }
      }
    }
  `,
  CHAT_HISTORY: gql`
    query getChatHistory($data: ChatHistoryInput!) {
      chatHistory(data: $data) {
        send
        receive
        message
        createTime
        img
      }
    }
  `,
};
