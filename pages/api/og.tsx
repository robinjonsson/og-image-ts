import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const merriweather = fetch(
  new URL('../../Merriweather-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// const raleway = fetch(
//   new URL('../../../../shared/assets/Raleway-Regular.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

// const openSans = fetch(
//   new URL('../../../../shared/assets/OpenSans-Bold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

// http://localhost:3000/api/art/generate/?heading=robin&subHeading=jonsson&border=white&size=50x70&style=modern&orientation=portrait&filter=none&filterOpacity=1
export default async function handler(req: NextRequest) {
  const merriweatherData = await merriweather;
  // const ralewayData = await raleway;
  // const openSansData = await openSans;

  try {
    return new ImageResponse(
      (
        <p
          style={{
            fontFamily: 'Merriweather',
            fontSize: '50px',
          }}
        >
          Test
        </p>
      ),
      {
        width: 750,
        height: 1050,
        fonts: [
          {
            name: 'Merriweather',
            data: merriweatherData,
            style: 'normal',
            weight: 400,
          },
          // {
          //   name: 'Raleway',
          //   data: ralewayData,
          //   style: 'normal',
          //   weight: 400,
          // },
          // {
          //   name: 'Open Sans',
          //   data: openSansData,
          //   style: 'normal',
          //   weight: 700,
          // },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
