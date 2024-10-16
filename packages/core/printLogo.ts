export default function () {
  if (PROD) {
    const logo = `
  _________________________________________________________________________________
  

  8888888b.         8888888888 888                                          888    
  888  "Y88b        888        888                                          888    
  888    888        888        888                                          888    
  888    888        8888888    888  .d88b.  88888b.d88b.   .d88b.  88888b.  888888 
  888    888        888        888 d8P  Y8b 888 "888 "88b d8P  Y8b 888 "88b 888    
  888    888 888888 888        888 88888888 888  888  888 88888888 888  888 888    
  888  .d88P        888        888 Y8b.     888  888  888 Y8b.     888  888 Y88b.  
  8888888P"         8888888888 888  "Y8888  888  888  888  "Y8888  888  888  "Y888                              
                                             
  _________________________________________________________________________________
                                author:D-Element
  `;

    const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[D-Element]:dev mode...");
  }
}
