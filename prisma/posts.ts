import prisma from "@/utils/prisma";
import nookies from 'nookies';

export async function getPosts(){
    const posts = await prisma.post.findMany({
      include:{
        author:true,
        categories: {
            include:{
                category:true,
            }
        }
    }
    });
    const utf8Encode = (unicodeString: string): string => {
      if (typeof unicodeString != "string")
        throw new TypeError("parameter ‘unicodeString’ is not a string");
  
      const utf8String = unicodeString
        .replace(/[\u0080-\u07ff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
        })
        .replace(/[\u0800-\uffff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(
            0xe0 | (cc >> 12),
            0x80 | ((cc >> 6) & 0x3f),
            0x80 | (cc & 0x3f)
          );
        });
      return utf8String;
    };
  return JSON.parse(utf8Encode(JSON.stringify(posts)))
}

export async  function getPost(id:string){
    const post = await prisma.post.findFirst({
        where: {
          id,
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          author: true,
        },
      });
    
      const utf8Encode = (unicodeString: string): string => {
        if (typeof unicodeString != "string")
          throw new TypeError("parameter ‘unicodeString’ is not a string");
    
        const utf8String = unicodeString
          .replace(/[\u0080-\u07ff]/g, (c) => {
            let cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
          })
          .replace(/[\u0800-\uffff]/g, (c) => {
            let cc = c.charCodeAt(0);
            return String.fromCharCode(
              0xe0 | (cc >> 12),
              0x80 | ((cc >> 6) & 0x3f),
              0x80 | (cc & 0x3f)
            );
          });
        return utf8String;
      };
    
      const res = utf8Encode(JSON.stringify(post));

      return JSON.parse(res)
}

export async function getMyPosts(cookies: string | undefined){


if(cookies){

  const posts = await prisma.post.findMany({
    where: {
      authorId: JSON.parse(cookies).user.user.id,
    },
    include: {
      categories: true,
    },
  });

  const utf8Encode = (unicodeString: string): string => {
    if (typeof unicodeString != "string")
      throw new TypeError("parameter ‘unicodeString’ is not a string");

    const utf8String = unicodeString
      .replace(/[\u0080-\u07ff]/g, (c) => {
        let cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
      })
      .replace(/[\u0800-\uffff]/g, (c) => {
        let cc = c.charCodeAt(0);
        return String.fromCharCode(
          0xe0 | (cc >> 12),
          0x80 | ((cc >> 6) & 0x3f),
          0x80 | (cc & 0x3f)
        );
      });
    return utf8String;
  };


  return JSON.parse(utf8Encode(JSON.stringify(posts)))}else{
    return null
  }

}