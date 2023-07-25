"use strict";

$ ( () => {
    
    const caption = $("#caption");           // the h2 element
    const mainImage = $("#main_image");      // the main img element
    
    // get all the <a> tags in the ul element
    const imageLinks = $("ul a");
    
    // process image links
    for ( let link of imageLinks ) {
        
        // preload image
        const image = new Image();
        image.src = link.href;
        
        // attach event handler
        link.click ( evt => {

            // set new image and caption
            mainImage.src = link.href;
            mainImage.alt = link.title;
            caption.textContent = link.title;
            
            // cancel the default action of the event
            evt.preventDefault();}
        );
    };
    
    // // set focus on first image link
    // imageLinks[0].focus();
});
