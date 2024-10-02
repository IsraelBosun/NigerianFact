// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { FontAwesome, Entypo } from '@expo/vector-icons';

// const FactCard = ({
//   image,
//   title,
//   shortDescription,
//   onReadMore,
//   onShare,
// }) => {
//   return (
//     <View className="bg-[#E2F3EA] rounded-2xl mb-4 mx-4 shadow-lg">
//       {image && (
//         <Image
//           source={{ uri: image }}
//           className="w-full h-48 rounded-2xl mb-4"
//         />
//       )}
//       <View className='px-4'>
//         <View className='flex-row items-center justify-between'>
//           <Text className="text-lg font-bold mb-2">{title}</Text>
//           <View className='flex-row items-center justify-center gap-4'>
//             <TouchableOpacity>
//               <FontAwesome name="heart-o" size={22} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Entypo name="flag" size={22} color="red" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Text className="text-md text-black mb-2">
//           {shortDescription}
//         </Text>
//         <View className='flex-row gap-2 pb-5'>
//           <TouchableOpacity
//             className='bg-green-700 px-6 py-2 rounded-2xl'
//             onPress={onReadMore}
//           >
//             <Text className='text-white text-xs'>Read More</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className='border px-7 py-2 rounded-2xl'
//             onPress={onShare}
//           >
//             <Text className='text-black text-xs'>Share</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default FactCard;


import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const FactCard = ({
  image,
  title,
  shortDescription,
  onReadMore,
  onShare,
}) => {
  // Add a fallback image URL if the provided `image` is invalid or null
  const validImage = typeof image === 'string' && image ? image : 'https://via.placeholder.com/150';

  return (
    <View className="bg-[#E2F3EA] rounded-2xl mb-4 mx-4 shadow-lg">
      {validImage && (
        <Image
          source={{ uri: validImage }}
          className="w-full h-48 rounded-2xl mb-4"
        />
      )}
      <View className='px-4'>
        <View className='flex-row items-center justify-between'>
          <Text className="text-lg font-bold mb-2">{title}</Text>
          <View className='flex-row items-center justify-center gap-4'>
            <TouchableOpacity>
              <FontAwesome name="heart-o" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="flag" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-md text-black mb-2">
          {shortDescription}
        </Text>
        <View className='flex-row gap-2 pb-5'>
          <TouchableOpacity
            className='bg-green-700 px-6 py-2 rounded-2xl'
            onPress={onReadMore}
          >
            <Text className='text-white text-xs'>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='border px-7 py-2 rounded-2xl'
            onPress={onShare}
          >
            <Text className='text-black text-xs'>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FactCard;
