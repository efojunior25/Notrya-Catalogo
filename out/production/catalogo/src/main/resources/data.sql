-- Inserir produtos de roupas
INSERT INTO products (name, description, price, stock, category, size, color, brand, material, gender, image_url, active, created_at, version) VALUES

-- Camisetas Masculinas
('Camiseta Básica Preta', 'Camiseta básica de algodão 100% preta, corte masculino', 29.90, 50, 'CAMISETA', 'M', 'PRETO', 'BasicWear', 'Algodão 100%', 'MASCULINO', 'https://example.com/camiseta-basica-preta-m.jpg', true, NOW(), 0),
('Camiseta Básica Preta', 'Camiseta básica de algodão 100% preta, corte masculino', 29.90, 45, 'CAMISETA', 'G', 'PRETO', 'BasicWear', 'Algodão 100%', 'MASCULINO', 'https://example.com/camiseta-basica-preta-g.jpg', true, NOW(), 0),
('Camiseta Básica Branca', 'Camiseta básica de algodão 100% branca, corte masculino', 29.90, 40, 'CAMISETA', 'M', 'BRANCO', 'BasicWear', 'Algodão 100%', 'MASCULINO', 'https://example.com/camiseta-basica-branca-m.jpg', true, NOW(), 0),
('Camiseta Básica Branca', 'Camiseta básica de algodão 100% branca, corte masculino', 29.90, 35, 'CAMISETA', 'G', 'BRANCO', 'BasicWear', 'Algodão 100%', 'MASCULINO', 'https://example.com/camiseta-basica-branca-g.jpg', true, NOW(), 0),
('Camiseta Estampada Azul', 'Camiseta com estampa moderna azul, corte masculino', 39.90, 30, 'CAMISETA', 'M', 'AZUL', 'TrendStyle', 'Algodão/Poliéster', 'MASCULINO', 'https://example.com/camiseta-estampada-azul-m.jpg', true, NOW(), 0),

-- Camisetas Femininas
('Camiseta Baby Look Rosa', 'Camiseta baby look rosa, corte feminino', 32.90, 25, 'CAMISETA', 'P', 'ROSA', 'FemStyle', 'Algodão 100%', 'FEMININO', 'https://example.com/babylook-rosa-p.jpg', true, NOW(), 0),
('Camiseta Baby Look Rosa', 'Camiseta baby look rosa, corte feminino', 32.90, 28, 'CAMISETA', 'M', 'ROSA', 'FemStyle', 'Algodão 100%', 'FEMININO', 'https://example.com/babylook-rosa-m.jpg', true, NOW(), 0),
('Camiseta Cropped Branca', 'Camiseta cropped branca moderna', 34.90, 20, 'CAMISETA', 'P', 'BRANCO', 'YoungStyle', 'Algodão/Elastano', 'FEMININO', 'https://example.com/cropped-branca-p.jpg', true, NOW(), 0),

-- Calças Masculinas
('Calça Jeans Azul Clássica', 'Calça jeans azul tradicional masculina', 89.90, 15, 'CALCA', 'TAMANHO_42', 'AZUL', 'DenimCo', 'Jeans 98% Algodão', 'MASCULINO', 'https://example.com/calca-jeans-azul-42.jpg', true, NOW(), 0),
('Calça Jeans Azul Clássica', 'Calça jeans azul tradicional masculina', 89.90, 18, 'CALCA', 'TAMANHO_44', 'AZUL', 'DenimCo', 'Jeans 98% Algodão', 'MASCULINO', 'https://example.com/calca-jeans-azul-44.jpg', true, NOW(), 0),
('Calça Chino Bege', 'Calça chino bege elegante masculina', 79.90, 12, 'CALCA', 'TAMANHO_42', 'BEGE', 'ClassicFit', 'Algodão/Elastano', 'MASCULINO', 'https://example.com/chino-bege-42.jpg', true, NOW(), 0),

-- Calças Femininas
('Calça Skinny Preta', 'Calça skinny preta feminina modeladora', 69.90, 22, 'CALCA', 'TAMANHO_38', 'PRETO', 'SlimFit', 'Poliéster/Elastano', 'FEMININO', 'https://example.com/skinny-preta-38.jpg', true, NOW(), 0),
('Calça Skinny Preta', 'Calça skinny preta feminina modeladora', 69.90, 25, 'CALCA', 'TAMANHO_40', 'PRETO', 'SlimFit', 'Poliéster/Elastano', 'FEMININO', 'https://example.com/skinny-preta-40.jpg', true, NOW(), 0),
('Calça Wide Leg Branca', 'Calça wide leg branca moderna feminina', 85.90, 10, 'CALCA', 'TAMANHO_38', 'BRANCO', 'ModernStyle', 'Viscose/Linho', 'FEMININO', 'https://example.com/wide-leg-branca-38.jpg', true, NOW(), 0),

-- Vestidos
('Vestido Floral Verão', 'Vestido floral leve para o verão', 95.90, 8, 'VESTIDO', 'P', 'MULTICOLOR', 'SummerVibes', 'Viscose', 'FEMININO', 'https://example.com/vestido-floral-p.jpg', true, NOW(), 0),
('Vestido Floral Verão', 'Vestido floral leve para o verão', 95.90, 12, 'VESTIDO', 'M', 'MULTICOLOR', 'SummerVibes', 'Viscose', 'FEMININO', 'https://example.com/vestido-floral-m.jpg', true, NOW(), 0),
('Vestido Midi Preto', 'Vestido midi preto elegante', 120.90, 6, 'VESTIDO', 'M', 'PRETO', 'ElegantWear', 'Poliéster/Elastano', 'FEMININO', 'https://example.com/vestido-midi-preto-m.jpg', true, NOW(), 0),

-- Bermudas Masculinas
('Bermuda Jeans Azul', 'Bermuda jeans azul masculina', 55.90, 20, 'BERMUDA', 'TAMANHO_42', 'AZUL', 'CasualWear', 'Jeans', 'MASCULINO', 'https://example.com/bermuda-jeans-42.jpg', true, NOW(), 0),
('Bermuda Tactel Preta', 'Bermuda tactel preta esportiva', 45.90, 25, 'BERMUDA', 'M', 'PRETO', 'SportFit', 'Tactel', 'MASCULINO', 'https://example.com/bermuda-tactel-m.jpg', true, NOW(), 0),

-- Blusas Femininas
('Blusa Social Branca', 'Blusa social branca feminina', 65.90, 15, 'BLUSA', 'P', 'BRANCO', 'OfficeStyle', 'Poliéster', 'FEMININO', 'https://example.com/blusa-social-branca-p.jpg', true, NOW(), 0),
('Blusa Social Branca', 'Blusa social branca feminina', 65.90, 18, 'BLUSA', 'M', 'BRANCO', 'OfficeStyle', 'Poliéster', 'FEMININO', 'https://example.com/blusa-social-branca-m.jpg', true, NOW(), 0),
('Blusa Estampada Floral', 'Blusa estampada com flores coloridas', 58.90, 12, 'BLUSA', 'M', 'MULTICOLOR', 'FloralStyle', 'Viscose', 'FEMININO', 'https://example.com/blusa-floral-m.jpg', true, NOW(), 0),

-- Jaquetas Unissex
('Jaqueta Jeans Azul', 'Jaqueta jeans azul clássica unissex', 129.90, 8, 'JAQUETA', 'M', 'AZUL', 'DenimCo', 'Jeans 100% Algodão', 'UNISSEX', 'https://example.com/jaqueta-jeans-m.jpg', true, NOW(), 0),
('Jaqueta Jeans Azul', 'Jaqueta jeans azul clássica unissex', 129.90, 10, 'JAQUETA', 'G', 'AZUL', 'DenimCo', 'Jeans 100% Algodão', 'UNISSEX', 'https://example.com/jaqueta-jeans-g.jpg', true, NOW(), 0),

-- Tênis
('Tênis Casual Branco', 'Tênis casual branco confortável', 159.90, 15, 'TENIS', 'TAMANHO_40', 'BRANCO', 'ComfortStep', 'Sintético/Tecido', 'UNISSEX', 'https://example.com/tenis-branco-40.jpg', true, NOW(), 0),
('Tênis Casual Branco', 'Tênis casual branco confortável', 159.90, 12, 'TENIS', 'TAMANHO_42', 'BRANCO', 'ComfortStep', 'Sintético/Tecido', 'UNISSEX', 'https://example.com/tenis-branco-42.jpg', true, NOW(), 0),
('Tênis Esportivo Preto', 'Tênis esportivo preto para corrida', 189.90, 8, 'TENIS', 'TAMANHO_41', 'PRETO', 'RunFast', 'Tecido/Borracha', 'UNISSEX', 'https://example.com/tenis-esportivo-41.jpg', true, NOW(), 0),

-- Acessórios
('Boné Snapback Preto', 'Boné snapback preto ajustável', 39.90, 30, 'BONE', 'UNICO', 'PRETO', 'CapStyle', 'Algodão/Poliéster', 'UNISSEX', 'https://example.com/bone-snapback-preto.jpg', true, NOW(), 0),
('Boné Dad Hat Branco', 'Boné dad hat branco vintage', 35.90, 25, 'BONE', 'UNICO', 'BRANCO', 'VintageStyle', 'Algodão', 'UNISSEX', 'https://example.com/bone-dad-hat-branco.jpg', true, NOW(), 0),
('Bolsa Transversal Preta', 'Bolsa transversal preta pequena', 45.90, 18, 'BOLSA', 'UNICO', 'PRETO', 'BagStyle', 'Sintético', 'FEMININO', 'https://example.com/bolsa-transversal-preta.jpg', true, NOW(), 0),
('Cinto de Couro Marrom', 'Cinto de couro marrom masculino', 69.90, 20, 'CINTO', 'UNICO', 'MARROM', 'LeatherCraft', 'Couro Genuíno', 'MASCULINO', 'https://example.com/cinto-couro-marrom.jpg', true, NOW(), 0),

-- Produtos com estoque baixo para testar
('Casaco de Lã Cinza', 'Casaco de lã cinza para inverno', 199.90, 2, 'CASACO', 'G', 'CINZA', 'WinterWear', 'Lã/Poliéster', 'UNISSEX', 'https://example.com/casaco-la-cinza-g.jpg', true, NOW(), 0),
('Saia Midi Plissada', 'Saia midi plissada elegante', 78.90, 1, 'SAIA', 'M', 'NAVY', 'ElegantWear', 'Poliéster', 'FEMININO', 'https://example.com/saia-plissada-m.jpg', true, NOW(), 0),

-- Produto sem estoque para testar
('Shorts Jeans Destroyed', 'Shorts jeans destroyed feminino', 65.90, 0, 'SHORTS', 'TAMANHO_38', 'AZUL', 'RebeldStyle', 'Jeans', 'FEMININO', 'https://example.com/shorts-destroyed-38.jpg', true, NOW(), 0);