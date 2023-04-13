import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';
    const number = searchParams.get('number');

    return new ImageResponse(
      (
        <div
      style={{
        backgroundColor: 'white',
        backgroundSize: '150px 150px',
        height: '100%',
        width: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          flexDirection: 'row'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Vercel"
          height={200}
          src={`https://www.iberia.com/wcs_statics/images/modules/ibe_cards/ibe-card-plus-normal.png`}
          style={{ margin: '0 30px' }}
          width={232}
        />
      
      <div
        style={{
          fontSize: 60,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: 'black',
          marginTop: 30,
          padding: '0 120px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}
      >
        { title }
      </div>
      </div>
      <div style={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            flexDirection: 'row'
      }}>
        <span>Mis viajes { number }</span>
      </div>
   </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
