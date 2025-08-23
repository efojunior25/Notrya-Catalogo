package com.xunim.notryaCatalogo.util;

import org.springframework.stereotype.Component;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class ImageUtil {

    /**
     * Redimensiona uma imagem mantendo a proporção
     */
    public byte[] resizeImage(byte[] originalImage, int maxWidth, int maxHeight) throws IOException {
        ByteArrayInputStream bis = new ByteArrayInputStream(originalImage);
        BufferedImage img = ImageIO.read(bis);

        if (img == null) {
            throw new IOException("Imagem inválida");
        }

        int originalWidth = img.getWidth();
        int originalHeight = img.getHeight();

        // Calcular novas dimensões mantendo proporção
        double ratio = Math.min((double) maxWidth / originalWidth, (double) maxHeight / originalHeight);
        int newWidth = (int) (originalWidth * ratio);
        int newHeight = (int) (originalHeight * ratio);

        BufferedImage resizedImg = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        resizedImg.createGraphics().drawImage(img, 0, 0, newWidth, newHeight, null);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(resizedImg, "jpg", bos);
        return bos.toByteArray();
    }

    /**
     * Valida se o arquivo é uma imagem válida
     */
    public boolean isValidImage(byte[] imageData) {
        try {
            ByteArrayInputStream bis = new ByteArrayInputStream(imageData);
            BufferedImage img = ImageIO.read(bis);
            return img != null;
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * Obtém as dimensões de uma imagem
     */
    public int[] getImageDimensions(byte[] imageData) throws IOException {
        ByteArrayInputStream bis = new ByteArrayInputStream(imageData);
        BufferedImage img = ImageIO.read(bis);
        if (img == null) {
            throw new IOException("Imagem inválida");
        }
        return new int[]{img.getWidth(), img.getHeight()};
    }
}
