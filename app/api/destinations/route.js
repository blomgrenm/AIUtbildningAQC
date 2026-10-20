import { getDestinations } from '../../../lib/travel.js';

export function GET() {
  return Response.json(getDestinations());
}
