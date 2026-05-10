<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Creator;
use App\Models\VoxelModel;
use Illuminate\Support\Facades\Hash;

class VoxelMarketSeeder extends Seeder
{
    public function run(): void
    {
        User::create(['name' => 'Admin', 'email' => 'admin@voxelmarket.com', 'password' => Hash::make('password'), 'role' => 'admin']);
        User::create(['name' => 'John Doe', 'email' => 'user@voxelmarket.com', 'password' => Hash::make('password'), 'role' => 'user']);

        $creators = [];
        $cd = [
            ['name'=>'Kenji Makes','handle'=>'@kenjimakes','initial'=>'K','bio'=>'Sci-fi vehicles and hard-surface props for indie games.','verified'=>true,'followers'=>1250],
            ['name'=>'Sofia Beasts','handle'=>'@sofiabeasts','initial'=>'S','bio'=>'Stylized creatures and friendly monsters.','verified'=>true,'followers'=>1180],
            ['name'=>'Omar Builds','handle'=>'@omarbuilds','initial'=>'O','bio'=>'Architectural and environment kits for tabletop digital scenes.','verified'=>true,'followers'=>980],
            ['name'=>'Lina Forge','handle'=>'@linaforge','initial'=>'L','bio'=>'Hand-painted weapons and fantasy gear.','verified'=>true,'followers'=>850],
            ['name'=>'Aria Voxel','handle'=>'@ariavoxel','initial'=>'A','bio'=>'Stylized character artist with a love for low-poly heroes.','verified'=>true,'followers'=>720],
            ['name'=>'Ravi Craft','handle'=>'@ravicraft','initial'=>'R','bio'=>'Indie game-ready props with a cozy aesthetic.','verified'=>false,'followers'=>320],
            ['name'=>'Mika Studio','handle'=>'@mikastudio','initial'=>'M','bio'=>'Photorealistic food and product visualization specialist.','verified'=>true,'followers'=>1540],
            ['name'=>'Zara Props','handle'=>'@zaraprops','initial'=>'Z','bio'=>'Historical props and antique replicas for period games.','verified'=>true,'followers'=>690],
            ['name'=>'Niko Engine','handle'=>'@nikoengine','initial'=>'N','bio'=>'Mechanical parts and engine components for simulation games.','verified'=>false,'followers'=>410],
            ['name'=>'Pixel Maya','handle'=>'@pixelmaya','initial'=>'P','bio'=>'Retro-inspired voxel art and pixel-perfect 3D models.','verified'=>true,'followers'=>920],
        ];
        foreach ($cd as $d) { $creators[] = Creator::create($d); }

        // GLB URLs from KhronosGroup glTF-Sample-Models
        $glb = [
            'duck'    => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
            'helmet'  => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
            'lantern' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Lantern/glTF-Binary/Lantern.glb',
            'bottle'  => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
            'avocado' => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb',
            'corset'  => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Corset/glTF-Binary/Corset.glb',
            'box'     => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Box/glTF-Binary/Box.glb',
            'fox'     => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Fox/glTF-Binary/Fox.glb',
            'boom'    => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/BoomBox/glTF-Binary/BoomBox.glb',
            'brain'   => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/BrainStem/glTF-Binary/BrainStem.glb',
            'flight'  => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/FlightHelmet/glTF/FlightHelmet.gltf',
            'fish'    => 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb',
        ];

        // Reliable Unsplash images that match products
        $img = [
            'duck'      => 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
            'helmet'    => 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80',
            'lantern'   => 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80',
            'bottle'    => 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
            'avocado'   => 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80',
            'corset'    => 'https://images.unsplash.com/photo-1617503752587-97d2103a96ea?w=600&q=80',
            'crate'     => 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=600&q=80',
            'fox'       => 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80',
            'castle'    => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            'boombox'   => 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
            'brain'     => 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
            'flight'    => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
            'fish'      => 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&q=80',
            'space'     => 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80',
            'sword'     => 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=600&q=80',
            'car'       => 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
            'knight'    => 'https://images.unsplash.com/photo-1560343787-b26d0e78df9e?w=600&q=80',
            'robot'     => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
            'tree'      => 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80',
            'gun'       => 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&q=80',
            'chest'     => 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80',
            'crystal'   => 'https://images.unsplash.com/photo-1576012099595-8f3d82e5e1c8?w=600&q=80',
            'dragon'    => 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=600&q=80',
            'goggles'   => 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=600&q=80',
            'station'   => 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=600&q=80',
        ];

        $models = [
            ['name'=>'Rubber Duck','desc'=>'Classic rubber duck toy model with vibrant yellow textures. Perfect for bathroom scenes and playful environments.','price'=>15,'cat'=>'Props','img'=>$img['duck'],'url'=>$glb['duck'],'cid'=>2,'feat'=>true,'likes'=>342,'views'=>15200,'poly'=>4800,'vert'=>3200,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Damaged Sci-Fi Helmet','desc'=>'Battle-worn sci-fi helmet with scratches and dents. Highly detailed PBR textures for cinematic quality.','price'=>42,'cat'=>'Characters','img'=>$img['helmet'],'url'=>$glb['helmet'],'cid'=>1,'feat'=>true,'likes'=>567,'views'=>28400,'poly'=>15000,'vert'=>12000,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Antique Lantern','desc'=>'Victorian-era oil lantern with intricate metalwork. Great for horror and adventure game environments.','price'=>18,'cat'=>'Props','img'=>$img['lantern'],'url'=>$glb['lantern'],'cid'=>8,'feat'=>true,'likes'=>289,'views'=>12300,'poly'=>8200,'vert'=>6100,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Water Bottle','desc'=>'Realistic water bottle with transparent glass material and water refraction effects.','price'=>8,'cat'=>'Props','img'=>$img['bottle'],'url'=>$glb['bottle'],'cid'=>7,'feat'=>false,'likes'=>198,'views'=>8900,'poly'=>3400,'vert'=>2600,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Avocado','desc'=>'Photo-realistic avocado with detailed skin texture and seed. Ideal for food visualization.','price'=>6,'cat'=>'Props','img'=>$img['avocado'],'url'=>$glb['avocado'],'cid'=>7,'feat'=>true,'likes'=>445,'views'=>21000,'poly'=>2500,'vert'=>1800,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Corset Armor','desc'=>'Detailed Victorian corset with metallic buckles and leather straps.','price'=>35,'cat'=>'Characters','img'=>$img['corset'],'url'=>$glb['corset'],'cid'=>4,'feat'=>false,'likes'=>187,'views'=>9200,'poly'=>12400,'vert'=>9800,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Wooden Crate','desc'=>'Weathered wooden storage crate with rope handles. A must-have prop for adventure games.','price'=>5,'cat'=>'Environment','img'=>$img['crate'],'url'=>$glb['box'],'cid'=>3,'feat'=>false,'likes'=>312,'views'=>16700,'poly'=>1200,'vert'=>800,'tex'=>'1K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Animated Fox','desc'=>'Adorable low-poly fox with walk and idle animations. Game-ready optimized topology.','price'=>28,'cat'=>'Creatures','img'=>$img['fox'],'url'=>$glb['fox'],'cid'=>2,'feat'=>true,'likes'=>723,'views'=>35600,'poly'=>6200,'vert'=>4800,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>true,'anim'=>true],
            ['name'=>'Medieval Castle Tower','desc'=>'Modular medieval castle tower with detailed stone textures for fortress environments.','price'=>45,'cat'=>'Environment','img'=>$img['castle'],'url'=>$glb['box'],'cid'=>3,'feat'=>true,'likes'=>456,'views'=>22100,'poly'=>15200,'vert'=>12100,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Boom Box Radio','desc'=>'Retro 80s boombox with detailed speakers and buttons. Great for urban scenes.','price'=>14,'cat'=>'Props','img'=>$img['boombox'],'url'=>$glb['boom'],'cid'=>10,'feat'=>false,'likes'=>267,'views'=>11400,'poly'=>5600,'vert'=>4200,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Brain Stem','desc'=>'Anatomically accurate brain stem for medical visualization and education.','price'=>55,'cat'=>'Science','img'=>$img['brain'],'url'=>$glb['brain'],'cid'=>9,'feat'=>false,'likes'=>134,'views'=>6800,'poly'=>24000,'vert'=>19000,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>true],
            ['name'=>'Flight Helmet','desc'=>'Vintage aviator flight helmet with goggles. Museum-quality detail.','price'=>38,'cat'=>'Characters','img'=>$img['flight'],'url'=>$glb['flight'],'cid'=>8,'feat'=>true,'likes'=>389,'views'=>18700,'poly'=>18000,'vert'=>14500,'tex'=>'4K PBR','fmt'=>'.GLB, .GLTF, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Barramundi Fish','desc'=>'Detailed tropical fish with iridescent scales for underwater scenes.','price'=>16,'cat'=>'Creatures','img'=>$img['fish'],'url'=>$glb['fish'],'cid'=>2,'feat'=>false,'likes'=>221,'views'=>10500,'poly'=>7800,'vert'=>5900,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Sci-Fi Spaceship','desc'=>'Futuristic spaceship with detailed hull plating and engine glow effects.','price'=>52,'cat'=>'Vehicles','img'=>$img['space'],'url'=>$glb['corset'],'cid'=>1,'feat'=>true,'likes'=>612,'views'=>31200,'poly'=>22000,'vert'=>18500,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Fantasy Sword','desc'=>'Enchanted fantasy sword with glowing runes and magical particles.','price'=>12,'cat'=>'Weapons','img'=>$img['sword'],'url'=>$glb['helmet'],'cid'=>4,'feat'=>true,'likes'=>498,'views'=>24300,'poly'=>3200,'vert'=>2100,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Racing Car','desc'=>'High-performance racing car with detailed interior cockpit.','price'=>48,'cat'=>'Vehicles','img'=>$img['car'],'url'=>$glb['bottle'],'cid'=>1,'feat'=>false,'likes'=>534,'views'=>27800,'poly'=>28000,'vert'=>22000,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>true,'anim'=>false],
            ['name'=>'Knight Character','desc'=>'Fully rigged medieval knight with multiple armor pieces and combat animations.','price'=>39,'cat'=>'Characters','img'=>$img['knight'],'url'=>$glb['duck'],'cid'=>5,'feat'=>false,'likes'=>367,'views'=>19400,'poly'=>12800,'vert'=>9600,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>true,'anim'=>true],
            ['name'=>'Robot Companion','desc'=>'Cute robot companion with modular parts and LED eyes.','price'=>28,'cat'=>'Characters','img'=>$img['robot'],'url'=>$glb['lantern'],'cid'=>6,'feat'=>false,'likes'=>278,'views'=>14100,'poly'=>8900,'vert'=>7200,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>true,'anim'=>false],
            ['name'=>'Fantasy Tree','desc'=>'Stylized fantasy tree with glowing magical leaves and bioluminescent bark.','price'=>10,'cat'=>'Environment','img'=>$img['tree'],'url'=>$glb['avocado'],'cid'=>3,'feat'=>false,'likes'=>445,'views'=>21300,'poly'=>5600,'vert'=>4200,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Laser Blaster','desc'=>'Futuristic laser blaster with animated barrel rotation.','price'=>9,'cat'=>'Weapons','img'=>$img['gun'],'url'=>$glb['helmet'],'cid'=>4,'feat'=>false,'likes'=>189,'views'=>9600,'poly'=>4200,'vert'=>3100,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>true],
            ['name'=>'Ancient Treasure Chest','desc'=>'Ornate treasure chest with gold trim and animated open/close.','price'=>22,'cat'=>'Props','img'=>$img['chest'],'url'=>$glb['box'],'cid'=>8,'feat'=>true,'likes'=>534,'views'=>26700,'poly'=>6800,'vert'=>5100,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>true],
            ['name'=>'Crystal Gem','desc'=>'Procedurally generated crystal with refractive glass material.','price'=>7,'cat'=>'Props','img'=>$img['crystal'],'url'=>$glb['avocado'],'cid'=>10,'feat'=>false,'likes'=>312,'views'=>15800,'poly'=>2200,'vert'=>1600,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Dragon Whelp','desc'=>'Baby dragon with spread wings and fire breath. Fully rigged for animation.','price'=>65,'cat'=>'Creatures','img'=>$img['dragon'],'url'=>$glb['duck'],'cid'=>2,'feat'=>true,'likes'=>892,'views'=>42100,'poly'=>18400,'vert'=>14200,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>true,'anim'=>true],
            ['name'=>'Steampunk Goggles','desc'=>'Detailed steampunk goggles with brass gears and tinted lenses.','price'=>11,'cat'=>'Props','img'=>$img['goggles'],'url'=>$glb['boom'],'cid'=>9,'feat'=>false,'likes'=>178,'views'=>8700,'poly'=>4600,'vert'=>3400,'tex'=>'2K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
            ['name'=>'Space Station Module','desc'=>'Modular space station segment with airlocks and solar panels.','price'=>72,'cat'=>'Environment','img'=>$img['station'],'url'=>$glb['corset'],'cid'=>1,'feat'=>false,'likes'=>234,'views'=>11900,'poly'=>32000,'vert'=>26000,'tex'=>'4K PBR','fmt'=>'.GLB, .FBX, .OBJ','rig'=>false,'anim'=>false],
        ];

        foreach ($models as $m) {
            VoxelModel::create([
                'name' => $m['name'], 'description' => $m['desc'], 'price' => $m['price'],
                'category' => $m['cat'], 'image' => $m['img'], 'model_url' => $m['url'],
                'creator_id' => $creators[$m['cid'] - 1]->id, 'featured' => $m['feat'],
                'likes' => $m['likes'], 'views' => $m['views'], 'polygons' => $m['poly'],
                'vertices' => $m['vert'], 'textures' => $m['tex'], 'formats' => $m['fmt'],
                'rigged' => $m['rig'], 'animated' => $m['anim'],
            ]);
        }

        $this->command->info('✅ Seeded: ' . count($models) . ' models, ' . count($creators) . ' creators');
        $this->command->info('📧 Admin: admin@voxelmarket.com | Password: password');
    }
}
