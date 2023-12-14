import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
//transfer money 
        transfer_requested:'Transaction is requested',
        transfer_failed:'Unable to transfer',
        no_UPI_Id:'UPI ID is required to make a transaction',
        insufficient_funds:'Insufficient funds',
        zero_request:'Requested amount should not be zero',
        minimum_limit:'Minimum amount required to make a transaction is ₹100',
//payment method
        upi_correct:'UPI ID updated successfully',
        upi_wrong:'Check your UPI ID',
        upi_empty:'UPI ID should not be empty',
        invalid_upi:'Invalid UPI Id'
      },
    },
    te: {
      translation: {
// home screen 
        'Balance':'బ్యాలెన్స్',
        'RELOAD':'రీలోడ్',
        'Coupon': 'కూపన్ల',
        'History': 'జాబితా',
        'Scan': 'స్కాన్ ',
        'User':'యూజర్',
        'Profile':'వివరాలు',
        'Withdrawal':'ఉపసంహరణ',
        'Transfer':'డబ్బు బదిలీ',
        'Money':'చెయ్యి',
        'Payment': 'చెల్లింపు',
        'Method':'పద్ధతి',
        'Notifi-': 'నోటిఫి-',
        'cations':'కేషన్స్',
        'Change': 'భాషను',
        'Language': 'మార్చు',
        'Help':'సహాయం',
        'Feedback': 'అభిప్రాయం',
//coupon history
         'Coupons worth': '',
         'are scanned': 'విలువైన కూపన్లు స్కాన్ చేయబడ్డాయి',
         'See All Coupons': 'అన్ని కూపన్లను చూడండి',
         'No coupons scanned till now':'ఇప్పటి వరకు కూపన్‌లు స్కాన్ చేయబడలేదు',
//total coupon history
         'Number of Coupons Scanned':'స్కాన్ చేసిన కూపన్‌ల సంఖ్య',
//withdrawal history
         'Completed':'పూర్తయినవి',
         'Pending':'పెండింగ్‌',
         'Rejected':'తిరస్కరించినవి',
         'completed':'పూర్తయింది',
         'pending':'పెండింగ్‌',
         'rejected':'తిరస్కరించారు',
//transfer money
          'Available Balance':'అందుబాటులో ఉన్న పాయింట్లు',
          'Enter the Amount you want to transfer:':'మీరు బదిలీ చేయాలనుకుంటున్న మొత్తాన్ని నమోదు చేయండి:',
          'Transfer Money':'డబ్బు బదిలీ చేయండి',
          'No transactions requested till now':'ఇప్పటి వరకు ఎలాంటి లావాదేవీలు అభ్యర్థించబడలేదు',
          //alert
          transfer_requested:'లావాదేవీ విజయవంతమైంది',
          transfer_failed:'బదిలీ చేయడం సాధ్యం కాలేదు',
          no_UPI_Id:'లావాదేవీ చేయడానికి UPI ID అవసరం',
          insufficient_funds:'తగినంత నిధులు లేవు',
          zero_request:'అభ్యర్థించిన మొత్తం సున్నాగా ఉండకూడదు',
          minimum_limit:'లావాదేవీ చేయడానికి అవసరమైన కనీస మొత్తం ₹100',
//payment method
          'Payment Method':'చెల్లింపు పద్ధతి',
          'Enter your UPI ID:': 'మీ UPI IDని నమోదు చేయండి:',
          'Submit':'సమర్పించండి',
          //alert
          upi_correct:'UPI ID విజయవంతంగా జోడించబడింది',
          upi_wrong:'UPI ID సరిచూసుకోండి',
          upi_empty:'UPI ID ఖాళీగా ఉండకూడదు',
          invalid_upi:'చెల్లని UPI Id',
        'Please select the language you can understand':'దయచేసి మీరు అర్థం చేసుకోగలిగే భాషను ఎంచుకోండి'
      },
    },
    
    hi: {
      translation: {
// home screen 
        'Balance':'बैलेंस',
        'RELOAD':'रीलोड',
        'Coupon': 'कूपन',
        'History': 'सूची',
        'Scan': 'स्कैन ',
        'User':'यूजर',
        'Profile':'विवरण',
        'Withdrawal':'निकासी',
        'Transfer':'स्थानांतरण',
        'Money':'धन',
        'Payment': 'भुगतान',
        'Method':'तरीका',
        'Notifi-': 'नोटिफि-',
        'cations':'केशन',
        'Change': 'भाषा',
        'Language': 'बदले',
        'Help':'मदद',
        'Feedback': 'प्रतिक्रिया',
//coupon history
         'Coupons worth': '',
         'are scanned': 'मूल्य के कूपन स्कैन किए हैं',
          'No coupons scanned till now':'अब तक कोई कूपन स्कैन नहीं किया गया',
//total coupon history
          'See All Coupons':'सभी कूपन देखें',
          'Number of Coupons Scanned': 'स्कैन किए गए कूपन की संख्या',
//withdrawal history
         'Completed':'पुरा हुआ',
         'Pending':'लंबित',
         'Rejected':'रद्द हुआ',
         'completed':'पुरा हुआ',
         'pending':'लंबित',
         'rejected':'रद्द हुआ ',
//transfer money
          'Available Balance':'उपलब्ध राशि',
          'Enter the Amount you want to transfer:':'वह राशि दर्ज करें जिसे आप स्थानांतरित करना चाहते हैं:',
          'Transfer Money':'धन हस्तांतरण',
          'No transactions requested till now':'अब तक किसी लेन-देन का अनुरोध नहीं किया गया',
          transfer_requested:'लेन-देन का अनुरोध किया गया है',
          transfer_failed:'स्थानांतरित करने में असमर्थ',
          no_UPI_Id:'लेनदेन करने के लिए UPI ID आवश्यक है',
          insufficient_funds:'अपर्याप्त कोष',
          zero_request:'अनुरोधित राशि शून्य नहीं होनी चाहिए',
          minimum_limit:'लेन-देन करने के लिए आवश्यक न्यूनतम राशि है ₹100',
//payment method
          'Payment Method':'भुगतान विधि',
          'Enter your UPI ID:': 'अपनी UPI ID दर्ज करें:',
          'Submit':'जोडो',
          //alert
          upi_correct:'UPI ID सफलतापूर्वक जोड़ा गया',
          upi_wrong:'जाँचें अपना UPI ID',
          upi_empty:'UPI ID खाली नहीं होना चाहिए',
          invalid_upi:'अमान्य UPI Id',

        'Please select the language you can understand':'कृपया वह भाषा चुनें जिसे आप समझ सकें'
      },
    },
    or: {
      translation: {
// home screen 
        'Balance':'ବାଲାନ୍ସ ରାଶି',
        'RELOAD':'', //translation required
        'Coupon':'କୁପନ୍',
        'History':'ପୂର୍ବ ଦେୟ',
        'Scan':	'ସ୍କାନ୍ କରନ୍ତୁ |',
        'User':	'ଉପଯୋଗକର୍ତ୍ତା',
        'profile':'ପ୍ରୋଫାଇଲ୍',
        'Withdrawal':	'ପ୍ରତ୍ୟାହାର କରନ୍ତୁ',
        'Transfer':	'ସ୍ଥାନାନ୍ତର କରନ୍ତୁ',
        'Money':	'ଟଙ୍କା',
        'Payment':	'ଦେୟ',
        'Method':	'ପଦ୍ଧତି',
        'Notification':	'ବିଜ୍ଞପ୍ତି',
        'Change':	'ପରିବର୍ତ୍ତନ କରନ୍ତୁ',
        'Language':	'ଭାଷା',
        'Help':	'ସାହାଯ୍ୟ କରନ୍ତୁ',
        'Feedback':	'ମତାମତ',
//coupon history
         'Coupons worth': '',
         'are scanned': 'କୁପନ୍ ମୂଲ୍ୟ ସ୍କାନ୍ କରାଯାଇଛି',
         'See All Coupons': 'ସମସ୍ତ କୁପନ୍ ଦେଖନ୍ତୁ',
         'No coupons scanned till now':'', //translation required
//total coupon history
         'Number of Coupons Scanned':'ସ୍କାନ୍ ହୋଇଥିବା କୁପନ୍ ସଂଖ୍ୟା', 
//withdrawal history
          'Completed':	'ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି',
          'Pending':	'ବିଚାରାଧୀନ ରହିଛି',
          'Rejected':	'ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଇଛି',
          'completed':	'ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି',
          'pending':	'ବିଚାରାଧୀନ ରହିଛି',
          'rejected':	'ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଇଛି',
//transfer money
          'Available Balance':'ଉପଲବ୍ଧ ପଏଣ୍ଟ',
          'Enter the Amount you want to transfer:':'ଆପଣ ସ୍ଥାନାନ୍ତର କରିବାକୁ ଚାହୁଁଥିବା ରାଶି ପ୍ରବେଶ କରନ୍ତୁ:',
          'Transfer Money':'ଟଙ୍କା ସ୍ଥାନାନ୍ତର କରନ୍ତୁ',
          'No transactions requested till now':'', //translation required
          //alert
          transfer_requested:'',//translation required
          transfer_failed:'',//translation required
          no_UPI_Id:'',//translation required
          insufficient_funds:'',//translation required
          zero_request:'',//translation required
          minimum_limit:'లావాదేవీ చేయడానికి అవసరమైన కనీస మొత్తం ₹100',//translation required
//payment method
          'Payment Method':'ଦେୟ ପଦ୍ଧତି',
          'Enter your UPI ID:': 'ଆପଣଙ୍କ UPI ID ପ୍ରବେଶ କରନ୍ତୁ:',
          'Submit':'ଦାଖଲ',
          //alert
          upi_correct:'UPI ID విజయవంతంగా జోడించబడింది',//translation required
          upi_wrong:'UPI ID సరిచూసుకోండి',//translation required
          upi_empty:'UPI ID ఖాళీగా ఉండకూడదు',//translation required
          invalid_upi:'చెల్లని UPI Id',//translation required
        'Please select the language you can understand':'ଦୟାକରି ଆପଣ ବୁଝିପାରୁଥିବା ଭାଷା ଚୟନ କରନ୍ତୁ'
      },
    },
  },
});
export default i18n;
