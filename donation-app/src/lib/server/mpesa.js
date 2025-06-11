import Mpesa from 'mpesa-api';
import {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
//   MPESA_SHORTCODE,
//   MPESA_PASSKEY
} from '$env/static/private';

const mpesa = new Mpesa({
  consumerKey: MPESA_CONSUMER_KEY,
  consumerSecret: MPESA_CONSUMER_SECRET,
  initiatorName: 'testapi',
  environment: 'sandbox'
});

export default mpesa;