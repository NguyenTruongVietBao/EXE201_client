import {
  Upload,
  X,
  Tag,
  FileText,
  File,
  Image,
  Archive,
  DollarSign,
  Percent,
  Video,
  Save,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import interestServices from '../../../services/interestServices';
import documentServices from '../../../services/documentServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../../../utils';

export default function CreateDocForm({ onCancel, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState({
    title: `Seller's Document A`,
    description:
      'Tài liệu này cung cấp kiến thức chuyên sâu, dễ hiểu, được biên soạn kỹ lưỡng và cập nhật theo xu hướng mới nhất.',
    interests: [],
    price: 0,
    discount: 0,
    thumbnailFiles: [],
    documentFiles: [],
    isFree: false,
    duration: '',
    videoFiles: [],
  });
  const [allInterests, setAllInterests] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [docDragActive, setDocDragActive] = useState(false);
  const [videoDragActive, setVideoDragActive] = useState(false);

  const allowedDocTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      '.pptx',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    'application/zip': '.zip',
    'application/x-zip-compressed': '.zip',
    'application/x-rar-compressed': '.rar',
    'application/x-7z-compressed': '.7z',
  };

  useEffect(() => {
    const fetchAllInterests = async () => {
      const response = await interestServices.getAllInterests();
      setAllInterests(response.data);
    };
    fetchAllInterests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (documentData.interests.length === 0) {
      toast.error('Vui lòng chọn ít nhất một danh mục cho tài liệu');
      return;
    }

    try {
      setIsLoading(true);
      // Tạo FormData để gửi files
      const formData = new FormData();

      // Append text data
      formData.append('title', documentData.title);
      formData.append('description', documentData.description);
      formData.append('price', documentData.price);
      formData.append('discount', documentData.discount);
      formData.append('isFree', false);
      formData.append('duration', documentData.duration);

      // Append interests array
      const interestIds = documentData.interests.map(
        (interest) => interest._id
      );
      formData.append('interests', JSON.stringify(interestIds));

      // Append image files (thumbnailFiles -> imageUrls)
      if (documentData.thumbnailFiles.length > 0) {
        documentData.thumbnailFiles.forEach((file) => {
          formData.append('imageUrls', file);
        });
      }

      // Append document files (documentFiles -> documentUrls)
      if (documentData.documentFiles.length > 0) {
        documentData.documentFiles.forEach((file) => {
          formData.append('documentUrls', file);
        });
      }

      // Append video files (videoFiles -> videoUrls)
      if (documentData.videoFiles.length > 0) {
        documentData.videoFiles.forEach((file) => {
          formData.append('videoUrls', file);
        });
      }

      // Set default commission
      formData.append('commission', '15');

      console.log('FormData to Submit:', formData);

      const response = await documentServices.createDocument(formData);
      console.log('Response:', response);

      if (response.statusCode === 201) {
        toast.success('Tạo tài liệu thành công');
        if (onSubmit) {
          onSubmit(documentData);
        }
        navigate('/seller/my-documents');
      } else {
        toast.error(response.message || 'Tạo tài liệu thất bại');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      toast.error('Có lỗi xảy ra khi tạo tài liệu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setDocumentData({
      title: '',
      description:
        'Khóa học này giúp bạn học nâng cao hơn và có thể tự tin hơn trong cuộc sống',
      interests: [],
      price: 0,
      discount: 0,
      thumbnailFiles: [],
      documentFiles: [],
      isFree: false,
      duration: '',
      videoFiles: [],
    });
    setShowTagDropdown(false);

    // Call parent's onCancel function if provided
    if (onCancel) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setDocumentData({
        ...documentData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setDocumentData({
        ...documentData,
        [name]: value,
      });
    }
  };

  const handleThumbnailUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} is too large. Max size is 5MB`);
          return;
        }
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        thumbnailFiles: [...documentData.thumbnailFiles, ...validFiles],
      });
    }
  };

  const handleDocumentUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (
        file &&
        (allowedDocTypes[file.type] ||
          file.name.endsWith('.zip') ||
          file.name.endsWith('.rar') ||
          file.name.endsWith('.7z'))
      ) {
        if (file.size > 100 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Max size is 100MB`);
          return;
        }
        validFiles.push(file);
      } else {
        alert(`${file.name} is not a valid document file`);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        documentFiles: [...documentData.documentFiles, ...validFiles],
      });
    }
  };

  const handleVideoUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file && file.type.startsWith('video/')) {
        // Check file size (max 500MB for videos)
        if (file.size > 500 * 1024 * 1024) {
          alert(`Video ${file.name} quá lớn. Kích thước tối đa là 500MB`);
          return;
        }
        validFiles.push(file);
      } else {
        alert(`${file.name} không phải là file video hợp lệ`);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        videoFiles: [...documentData.videoFiles, ...validFiles],
      });
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleThumbnailUpload(files);
  };

  const handleDocumentDrop = (e) => {
    e.preventDefault();
    setDocDragActive(false);
    const files = e.dataTransfer.files;
    handleDocumentUpload(files);
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    setVideoDragActive(false);
    const files = e.dataTransfer.files;
    handleVideoUpload(files);
  };

  const handleThumbnailDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleThumbnailDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDocumentDragOver = (e) => {
    e.preventDefault();
    setDocDragActive(true);
  };

  const handleDocumentDragLeave = (e) => {
    e.preventDefault();
    setDocDragActive(false);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
    setVideoDragActive(true);
  };

  const handleVideoDragLeave = (e) => {
    e.preventDefault();
    setVideoDragActive(false);
  };

  const handleTagToggle = (interest) => {
    const isSelected = documentData.interests.some(
      (i) => i._id === interest._id
    );
    if (isSelected) {
      setDocumentData({
        ...documentData,
        interests: documentData.interests.filter((i) => i._id !== interest._id),
      });
    } else {
      setDocumentData({
        ...documentData,
        interests: [...documentData.interests, interest],
      });
    }
  };

  const removeTag = (interestToRemove) => {
    setDocumentData({
      ...documentData,
      interests: documentData.interests.filter(
        (interest) => interest._id !== interestToRemove._id
      ),
    });
  };

  const removeThumbnail = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      thumbnailFiles: documentData.thumbnailFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeDocument = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      documentFiles: documentData.documentFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeVideo = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      videoFiles: documentData.videoFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType, fileName) => {
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('presentation')) return '📊';
    if (fileType === 'text/plain') return '📃';
    if (fileType.includes('zip') || fileName.endsWith('.zip')) return '📦';
    if (fileName.endsWith('.rar')) return '📦';
    if (fileName.endsWith('.7z')) return '📦';
    return '📋';
  };

  return (
    <div className='max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100'>
      {/* Header */}
      <div className='mb-8 pb-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
              <DollarSign className='w-8 h-8 text-blue-600' />
              Sell Your Document
            </h1>
            <p className='text-gray-600 mt-2 text-lg'>
              Create a premium document listing to earn money
            </p>
          </div>
          {onCancel && (
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              Back
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Basic Information */}
        <div className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Document Name */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <FileText className='w-4 h-4' />
                  Tiêu đề tài liệu *
                </label>
                <input
                  type='text'
                  name='title'
                  value={documentData.title}
                  onChange={handleChange}
                  placeholder='Nhập tiêu đề tài liệu...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Mô tả chi tiết *
                </label>
                <textarea
                  name='description'
                  value={documentData.description}
                  onChange={handleChange}
                  placeholder='Mô tả chi tiết tài liệu của bạn bao gồm nội dung, cấp độ (Beginner/Intermediate/Advanced), thời lượng học, và các thông tin khác...'
                  rows={6}
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                  required
                />
              </div>
              {/* Duration */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <FileText className='w-4 h-4' />
                  Thời lượng học *
                </label>
                <input
                  type='text'
                  name='duration'
                  value={documentData.duration}
                  onChange={handleChange}
                  placeholder='Nhập thời lượng học...'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  required
                />
              </div>
              {/* Interests Selection */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <Tag className='w-4 h-4' />
                  Danh mục *
                </label>

                {/* Selected interests */}
                {documentData.interests.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-3'>
                    {documentData.interests.map((interest) => (
                      <span
                        key={interest._id}
                        className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'
                      >
                        {interest.emoji} {interest.name}
                        <button
                          type='button'
                          onClick={() => removeTag(interest)}
                          className='p-0.5 hover:bg-blue-200 rounded-full transition-colors duration-200'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Tag Dropdown */}
                <div className='relative'>
                  <button
                    type='button'
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-between'
                  >
                    <span className='text-gray-500'>
                      {documentData.interests.length > 0
                        ? `${documentData.interests.length} danh mục đã chọn`
                        : 'Chọn danh mục...'}
                    </span>
                    <Tag className='w-4 h-4 text-gray-400' />
                  </button>

                  {showTagDropdown && (
                    <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto'>
                      {allInterests.length > 0 ? (
                        allInterests.map((interest) => (
                          <button
                            key={interest._id}
                            type='button'
                            onClick={() => handleTagToggle(interest)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                              documentData.interests.some(
                                (i) => i._id === interest._id
                              )
                                ? 'bg-blue-50 text-blue-700'
                                : ''
                            }`}
                          >
                            <span>{interest.emoji}</span>
                            <span>{interest.name}</span>
                            {documentData.interests.some(
                              (i) => i._id === interest._id
                            ) && (
                              <span className='ml-auto text-blue-500'>✓</span>
                            )}
                          </button>
                        ))
                      ) : (
                        <div className='px-4 py-2 text-gray-500 text-center'>
                          Đang tải danh mục...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing */}
            <div className='space-y-6'>
              {/* Pricing Information */}
              <div className='bg-blue-50 rounded-2xl p-6'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <DollarSign className='w-5 h-5 text-blue-600' />
                  Pricing & Sales
                </h4>

                <div className='space-y-4'>
                  {/* Price */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Giá (VND) *
                    </label>
                    <input
                      type='number'
                      name='price'
                      value={documentData.price}
                      onChange={handleChange}
                      placeholder='500000'
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                      <Percent className='w-4 h-4' />
                      Giảm giá (%)
                    </label>
                    <input
                      type='number'
                      name='discount'
                      value={documentData.discount}
                      onChange={handleChange}
                      placeholder='20'
                      min='0'
                      max='99'
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    />
                  </div>

                  {/* Final Price (Calculated) */}
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Giá cuối (VND)
                    </label>
                    <div className='w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-semibold'>
                      {formatCurrency(
                        documentData.price
                          ? documentData.price -
                              (documentData.price * documentData.discount) / 100
                          : 0
                      )}
                    </div>
                  </div>

                  {/* Commission Info */}
                  <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                        <Percent className='w-4 h-4 text-white' />
                      </div>
                      <div>
                        <h5 className='font-semibold text-green-700'>
                          Platform Commission: 15%
                        </h5>
                        <p className='text-sm text-green-600'>
                          Standard commission rate for all sellers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Files & Media */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Column - Documents & Video */}
          <div className='space-y-6'>
            {/* Document Files Upload */}
            <div>
              <label className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <File className='w-4 h-4' />
                Document Files * ({documentData.documentFiles.length} files)
              </label>

              {/* Document File List */}
              {documentData.documentFiles.length > 0 && (
                <div className='mb-4 max-h-32 overflow-y-auto space-y-2'>
                  {documentData.documentFiles.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200'
                    >
                      <div className='text-lg'>
                        {getFileIcon(file.type, file.name)}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-gray-900 truncate text-sm'>
                          {file.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeDocument(index)}
                        className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                      >
                        <X className='w-3 h-3 text-red-500' />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  docDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDocumentDrop}
                onDragOver={handleDocumentDragOver}
                onDragLeave={handleDocumentDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-28 cursor-pointer p-4'>
                  <Archive className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1 text-center'>
                    Thả nhiều tài liệu vào đây hoặc nhấn để tải lên
                  </span>
                  <span className='text-xs text-gray-400 text-center'>
                    PDF, DOC, DOCX, PPT, PPTX, TXT, RTF, ZIP, RAR, 7Z (Max 100MB
                    each)
                  </span>
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf,.zip,.rar,.7z'
                    multiple
                    onChange={(e) => handleDocumentUpload(e.target.files)}
                    className='hidden'
                    required={documentData.documentFiles.length === 0}
                  />
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className=' text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <Video className='w-4 h-4' />
                Video Files ({documentData.videoFiles.length} files)
              </label>

              {/* Video File List */}
              {documentData.videoFiles.length > 0 && (
                <div className='mb-4 max-h-32 overflow-y-auto space-y-2'>
                  {documentData.videoFiles.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 p-2 bg-purple-50 rounded-lg border border-purple-200'
                    >
                      <div className='flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg'>
                        <Video className='w-5 h-5 text-purple-600' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-gray-900 truncate text-sm'>
                          {file.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeVideo(index)}
                        className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                      >
                        <X className='w-3 h-3 text-red-500' />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  videoDragActive
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleVideoDrop}
                onDragOver={handleVideoDragOver}
                onDragLeave={handleVideoDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-28 cursor-pointer p-4'>
                  <Video className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1 text-center'>
                    Thả nhiều video vào đây hoặc nhấn để tải lên
                  </span>
                  <span className='text-xs text-gray-400 text-center'>
                    MP4, AVI, MOV, WEBM, OGV (Max 500MB each)
                  </span>
                  <input
                    type='file'
                    accept='video/*'
                    multiple
                    onChange={(e) => handleVideoUpload(e.target.files)}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Images & Tags */}
          <div className='space-y-6'>
            {/* Image Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <Image className='w-4 h-4' />
                Hình ảnh ({documentData.thumbnailFiles.length} images)
              </label>

              {/* Image Preview Grid */}
              {documentData.thumbnailFiles.length > 0 && (
                <div className='mb-4 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
                  {documentData.thumbnailFiles.map((file, index) => (
                    <div key={index} className='relative group'>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className='w-full h-20 object-cover rounded-lg'
                      />
                      <button
                        type='button'
                        onClick={() => removeThumbnail(index)}
                        className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100'
                      >
                        <X className='w-3 h-3' />
                      </button>
                      <div className='absolute bottom-1 left-1 px-1 py-0.5 bg-black/50 text-white text-xs rounded'>
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleThumbnailDrop}
                onDragOver={handleThumbnailDragOver}
                onDragLeave={handleThumbnailDragLeave}
              >
                <label className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                  <Upload className='w-8 h-8 text-gray-400 mb-2' />
                  <span className='text-sm text-gray-600 mb-1'>
                    Thả nhiều hình ảnh vào đây hoặc nhấn để tải lên
                  </span>
                  <span className='text-xs text-gray-400'>
                    PNG, JPG, GIF, WEBP up to 5MB each
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => handleThumbnailUpload(e.target.files)}
                    className='hidden'
                  />
                </label>
              </div>
            </div>

            {/* Premium Document Badge */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4'>
              <div className='flex items-center gap-5'>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <DollarSign className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h4 className='font-semibold text-blue-700'>
                    Premium Document
                  </h4>
                  <p className='text-sm text-blue-600'>
                    Earn money by selling your high-quality documents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center justify-end gap-4 pt-8 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center gap-2'
          >
            <X className='w-4 h-4' />
            Hủy
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2'
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='w-4 h-4 animate-spin' />
                Đang tạo...
              </div>
            ) : (
              <>
                <Save className='w-4 h-4' />
                Tải tài liệu
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
