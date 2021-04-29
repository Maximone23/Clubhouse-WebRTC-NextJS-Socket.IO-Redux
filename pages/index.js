import Head from 'next/head';
import { WelcomeStep } from '../components/steps/WelcomeStep';

export default function Home() {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <WelcomeStep />
    </div>
  )
}
