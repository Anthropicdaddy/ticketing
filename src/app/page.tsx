export default function Home() {
  return null;
}

export const revalidate = 0;

export async function GET() {
  return Response.redirect(new URL('/en', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));
}