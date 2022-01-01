import Head from "next/head";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from "@mui/material/Card";

import Image from "next/image";
import DiscordLogo from "../public/static/images/discord-mascot.jpg"
import ClickLogo from "../public/static/images/click.png"
import BinaryLogo from "../public/static/images/binary10.png"

import { withStyles , makeStyles} from '@mui/styles'
import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"

import Profiles from '../src/components/index/profiles';
import styles from "../styles/Index.module.css"

// Props

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/user/home',
        permanent: false,
      },
    }
  }

  const providers = await getProviders();

  return {
    props: { providers }
  }
}

//  React

const useStyles = makeStyles({
  content: {
    justifyContent: "center"
  }
});  

export default function Landing({ providers }) {

  const TitleTypography = withStyles({
    root: {
        color: "#FFFF00",
        fontFamily: '"Press Start 2P", cursive'
    }
  })(Typography);

  const WhiteTextTypography = withStyles({
    root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive'
    }
  })(Typography);

  const classes = useStyles();

    // Automatically makes the discord auth instead of going to signin!
    const renderAuthButton = (providers) => {
      if ("discord" in providers) {
          return (   
          <Card className={styles.cursor} sx={{margin: 8, width: 150, height: 150, backgroundColor: "transparent"}} onClick={() => signIn(providers["discord"].id)}>
              <Image src={DiscordLogo} width={150} height={150}/>
          </Card>
        )
      } else {
        return (
          <Fab className={styles.cursor} sx={{margin: 8, width: 150, height: 150}} onClick={() => signIn()}>
            <Image src={DiscordLogo} width={150} height={150}/>
          </Fab>
        )
      }
    }
  
  return (
    <div className={styles.container}>
        <Head>
          <title> Hack4Pan </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <Image src={'https://i.ibb.co/NyXRxNC/drip.gif'} width={100} height={100}/>
          
          <TitleTypography variant="h1" component="div" className={styles.title} gutterBottom> 
            HACK 4 PAN<span className={styles.blink}>_</span>
          </TitleTypography>
          <WhiteTextTypography variant="h4" component="div" gutterBottom> 
            2022
          </WhiteTextTypography>

          <div className={styles.authentication}>
            {
              renderAuthButton(providers)
            }
            <WhiteTextTypography variant="body" component="div">
              Apply with Discord!
            </WhiteTextTypography>
          </div>
          
          <div className={styles.accordions}>
            <Accordion className={styles.accordionDescription} disableGutters >
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  {/* <Image src={BinaryLogo} width={25} height={25} /> */}
                  <WhiteTextTypography>
                    What is HACK4PAN?
                  </WhiteTextTypography>
                  {/* <Image src={ClickLogo} width={25} height={25} /> */}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                
                <WhiteTextTypography>
                Hack The Pan is! We're currently working on a website that will allow users to submit their projects and present them in front of a Frying Pan's livestream. The judges will be Frying Pan and other tech YouTubers!
                </WhiteTextTypography>
                
              </AccordionDetails>
            </Accordion>
            <div className={styles.accordionSeparator}>
              <WhiteTextTypography> </WhiteTextTypography>
            </div>
            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  What are the prizes? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                None yet Clueless
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>
          </div>
        </main>

        <footer className={styles.footer}>
          <WhiteTextTypography>
            <a
              href="https://www.youtube.com/c/FryingPan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}Frying Pan
            </a>
          </WhiteTextTypography>
          <Profiles/>
        </footer>
    </div>
  )
}